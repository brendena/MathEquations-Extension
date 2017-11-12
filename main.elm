port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, on, onClick, onMouseDown,onMouseUp)
import String
import Basics exposing (..)
import List exposing (..)
import Json.Encode exposing (encode, Value, string, int, float, bool, list, object)
import Html.CssHelpers exposing (withNamespace)
import MyCss
import Debug exposing (log)
import Mouse exposing (..)

port updatingBaseUrl : (String -> msg) -> Sub msg


main =
  Html.program
    { view = view
    , update = update
    , init = init
    , subscriptions = subscriptions
    }

init : (Model, Cmd Msg)
init  =
  ( Model "" False 800 Tex, Cmd.none
  )

{ id, class, classList } =
    withNamespace "main"

type  MathType =
         MathML
        | AsciiMath
        | Tex

type alias Model =
  { 
    baseUrl: String,
    trackMousePointerBool: Bool,
    equationContainerTop: Int,
    selectedMathEquation: MathType
  }

type Msg
  = UrlChange String
  | MouseChange Int Int
  | SetTrackMousePointer Bool
  | ChangeMathType MathType

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    UrlChange urlChange ->
        ({model | baseUrl = urlChange}, Cmd.none)
    MouseChange x y ->
      let _ = Debug.log "testing"  y
      in
        ({model | equationContainerTop = y } , Cmd.none)

    SetTrackMousePointer set -> 
      ({model | trackMousePointerBool = set}, Cmd.none)

    
    ChangeMathType mathType ->
      ({model | selectedMathEquation = mathType}, Cmd.none)
    
    

view : Model -> Html Msg
view model =
    div [ id "elmContainer"] [
        div [id MyCss.EquationsContainer, style[ ("top",toString(model.equationContainerTop) ++"px")]  ] [ 
          div [] [
            img [draggable "False",id MyCss.ResizeIcon, onMouseDown (SetTrackMousePointer True), src ( model.baseUrl ++ "images/resizeIcon.svg") ] []
          ],
          div [id MyCss.MathTextEquationContainer] [
            textarea [placeholder "equation location", id MyCss.MathEquationText] [text ""]
          ]
        ],
        div [id MyCss.NavContainer]  [ 
           img [id "logo", class [MyCss.NavLogo] , src ( model.baseUrl ++ "images/logoClearBackground.svg") ] [],
           button [onClick (ChangeMathType Tex), (navButtonClass model.selectedMathEquation Tex )] [
             img [id MyCss.LatexImage, src ( model.baseUrl ++ "images/latex.svg")] []
           ],
           button [onClick (ChangeMathType AsciiMath), (navButtonClass model.selectedMathEquation AsciiMath ) ] [text "AsciiMath"],
           button [onClick (ChangeMathType MathML), (navButtonClass model.selectedMathEquation MathML )] [text "MathML"]
        ]
    ]
{--------------ViewHelperFunc----------------------------------------}
navButtonClass : MathType -> MathType  -> Attribute Msg
navButtonClass modelMathTypeSelect mathType =
  let
      equal = modelMathTypeSelect ==  mathType
  in
    case equal of
      True -> class [MyCss.NavButton, MyCss.NavButtonSelected]
      False -> class [MyCss.NavButton]
{--------------ViewHelperFunc----------------------------------------}

{--------------SubScriptions----------------------------------------}
subscriptions : Model -> Sub Msg
subscriptions model =

  Sub.batch (trackMousePointer(model.trackMousePointerBool) ++  [
      updatingBaseUrl UrlChange,
      Mouse.ups (\{x, y} -> SetTrackMousePointer(False)  )
    ])

trackMousePointer : Bool -> List (Sub Msg)
trackMousePointer trackMouse =
  case trackMouse of
    True -> [ Mouse.moves (\{x, y} -> MouseChange x y)]
    False -> []
{-----------end-SubScriptions----------------------------------------}

--