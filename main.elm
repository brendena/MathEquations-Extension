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
  ( Model "" False 200, Cmd.none
  )

{ id, class, classList } =
    withNamespace "main"


type alias Model =
  { 
    baseUrl: String,
    trackMousePointerBool: Bool,
    equationContainerTop: Int
  }

type Msg
  = UrlChange String
  | MouseChange Int Int
  | SetTrackMousePointerTrue
  | SetTrackMousePointerFalse

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    UrlChange urlChange ->
        ({model | baseUrl = urlChange}, Cmd.none)
    MouseChange x y ->
      let _ = Debug.log "testing"  y
      in
        ({model | equationContainerTop = y } , Cmd.none)

    SetTrackMousePointerTrue  ->
      let
          _ = Debug.log "testing this out" 2
      in
          
      ({model | trackMousePointerBool = True}, Cmd.none)

    SetTrackMousePointerFalse ->
      ({model | trackMousePointerBool = False}, Cmd.none)

view : Model -> Html Msg
view model =
    div [ id "elmContainer"] [
        div [id MyCss.EquationsContainer, style[ ("top",toString(model.equationContainerTop) ++"px")]  ] [ 
          div [] [
            img [draggable "False",id MyCss.ResizeIcon, onMouseDown SetTrackMousePointerTrue, src ( model.baseUrl ++ "images/resizeIcon.svg") ] []
          ],
          div [id MyCss.MathTextEquationContainer] [
            textarea [placeholder "equation location", id MyCss.MathEquationText] [text ""]
          ]
        ],
        div [id MyCss.NavContainer]  [ 
           img [id "logo", class [MyCss.NavLogo] , src ( model.baseUrl ++ "images/logoClearBackground.svg") ] [],
           button [class [MyCss.NavButton]] [
             img [id MyCss.LatexImage, src ( model.baseUrl ++ "images/latex.svg")] []
           ],
           button [class [MyCss.NavButton]] [text "AsciiMath"],
           button [class [MyCss.NavButton]] [text "MathML"]
        ]
    ]

{--------------SubScriptions----------------------------------------}
subscriptions : Model -> Sub Msg
subscriptions model =

  Sub.batch (trackMousePointer(model.trackMousePointerBool) ++  [
      updatingBaseUrl UrlChange,
      Mouse.ups (\{x, y} -> SetTrackMousePointerFalse)
    ])

trackMousePointer : Bool -> List (Sub Msg)
trackMousePointer trackMouse =
  case trackMouse of
    True -> [ Mouse.moves (\{x, y} -> MouseChange x y)]
    False -> []
{-----------end-SubScriptions----------------------------------------}

--