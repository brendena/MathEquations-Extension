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

{--------------JsToElm----------------------------------------}
port updatingBaseUrl : (String -> msg) -> Sub msg
{--------------JsToElm----------------------------------------}

{--------------ElmToJS----------------------------------------}
port reloadEquation : String -> Cmd msg
port updateEquation : String -> Cmd msg
port sumitEquation : String -> Cmd msg
{--------------ElmToJS----------------------------------------}

main =
  Html.program
    { view = view
    , update = update
    , init = init
    , subscriptions = subscriptions
    }

init : (Model, Cmd Msg)
init  =
  ( Model "" False 800 Tex "", Cmd.none
  )

{ id, class, classList } =
    withNamespace "main"

type  MathType =
         MathML
        | AsciiMath
        | Tex
        | NoMathType

type alias Model =
  { 
    baseUrl: String,
    trackMousePointerBool: Bool,
    equationContainerTop: Int,
    selectedMathType: MathType,
    mathEquation: String
  }


encodeModel : Model -> Value
encodeModel model =
  Json.Encode.object
    [ ("selectedMathType",Json.Encode.string  (toString model.selectedMathType) )
    , ("mathEquation", Json.Encode.string model.mathEquation)
    ]


type Msg
  = UrlChange String
  | MouseChange Int Int
  | SetTrackMousePointer Bool
  | ChangeMathType MathType
  | UpdateEquation String

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
      let
        newMathType = if(model.selectedMathType == mathType)then NoMathType else mathType  
      in 
      ({model | selectedMathType = newMathType}, Cmd.none)
   
    UpdateEquation str->
        let
          newModel = { model |  mathEquation = str }
        in
          (newModel, updateEquation  (encode 0 (encodeModel newModel) ) ) 

view : Model -> Html Msg
view model =
    div [ id "elmContainer"] [
        div [id MyCss.EquationsContainer, style[ ("top",toString(model.equationContainerTop) ++"px")]  ] [ 
          div [] [
            img [draggable "False",id MyCss.ResizeIcon, onMouseDown (SetTrackMousePointer True), src ( model.baseUrl ++ "images/resizeIcon.svg") ] []
          ],
          div [id MyCss.MathTextEquationContainer] [
            textarea [onInput UpdateEquation, value model.mathEquation, placeholder "equation location", id MyCss.MathEquationText] [text ""],
            div[id MyCss.SvgContainer] [
              p [id "AsciiMathEquation",hidden (AsciiMath /= model.selectedMathType) ] [text "Ascii `` "], 
              p [id "TexEquation",hidden (Tex /= model.selectedMathType)] [text "Tex ${ }$ " ], 
              div[hidden (MathML /= model.selectedMathType)][
                p [] [text "MathML"],
                p [id "MathMLEquation"] [text ""] 
              ]
            ]
          ]
        ],
        div [id MyCss.NavContainer]  [ 
           img [id "logo", class [MyCss.NavLogo] , src ( model.baseUrl ++ "images/logoClearBackground.svg") ] [],
           button [onClick (ChangeMathType Tex), (navButtonClass model.selectedMathType Tex )] [
             img [id MyCss.LatexImage, src ( model.baseUrl ++ "images/latex.svg")] []
           ],
           button [onClick (ChangeMathType AsciiMath), (navButtonClass model.selectedMathType AsciiMath ) ] [text "AsciiMath"],
           button [onClick (ChangeMathType MathML), (navButtonClass model.selectedMathType MathML )] [text "MathML"]
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