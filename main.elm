port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, on, onClick, onMouseDown,onMouseUp)
import String
import Basics exposing (..)
import List exposing (..)
import Json.Decode exposing (decodeString, field)
import Json.Encode exposing (encode, Value, string, int, float, bool, list, object)
import Html.CssHelpers exposing (withNamespace)
import MyCss
import Debug exposing (log)
import Mouse exposing (..)
import Result 

{--------------JsToElm----------------------------------------}
port returnBoundingClientRect : (String -> msg) -> Sub msg
{--------------JsToElm----------------------------------------}

{--------------ElmToJS----------------------------------------}
port reloadEquation : String -> Cmd msg
port updateEquation : String -> Cmd msg
port sumitEquation : String -> Cmd msg
port getPageYOffset : String -> Cmd msg --!!! i don't need to submit a String
{--------------ElmToJS----------------------------------------}


type alias Flags = 
  {
    baseUrl : String
  }

init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { initialModel
        | baseUrl = flags.baseUrl
      }
    , Cmd.none
    )

initialModel : Model
initialModel =
    { baseUrl = ""
    , trackMousePointerBool = False
    , equationContainerTop = 800
    , selectedMathType = Tex
    , mathEquation = ""
    , mousePositionY = 0
    }



main =
  Html.programWithFlags
    { view = view
    , update = update
    , init = init
    , subscriptions = subscriptions
    }



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
    mathEquation: String,
    mousePositionY: Int
  }


encodeModel : Model -> Value
encodeModel model =
  Json.Encode.object
    [ ("selectedMathType",Json.Encode.string  (toString model.selectedMathType) )
    , ("mathEquation", Json.Encode.string model.mathEquation)
    ]

--decodeBoundingClientRect : String

type Msg
  = UrlChange String
  | MouseChange Int Int
  | SetTrackMousePointer Bool
  | ChangeMathType MathType
  | UpdateEquation String
  | SubmitEquation
  | GotPageYOffset String

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    UrlChange urlChange ->
        ({model | baseUrl = urlChange}, Cmd.none)
    MouseChange x y ->
      let _ = 1 --+ Debug.log "testing"  y
          --test = Debug.log "window height" Window.size
      in
        ({model | mousePositionY = y } , getPageYOffset (toString(y)) )

    SetTrackMousePointer set -> 
      ({model | trackMousePointerBool = set}, Cmd.none)

    
    ChangeMathType mathType ->
      let
        newMathType = if(model.selectedMathType == mathType) then NoMathType else mathType 
        newModel =  {model | selectedMathType = newMathType}
      in 
      (newModel, updateEquation  (encode 0 (encodeModel newModel) ))
   
    UpdateEquation str->
        let
          newModel = { model |  mathEquation = str }
        in
          (newModel, updateEquation  (encode 0 (encodeModel newModel) ) ) 

    SubmitEquation ->
        (model, sumitEquation  (encode 0 (encodeModel model) ) ) 
    
    
    GotPageYOffset offsetString->
        let
             --test = decodeString (field "name" string) "{ \"name\": \"tom\" }"
             convert = String.toInt offsetString
             position = case convert of  
                        Ok offset-> model.mousePositionY - offset
                        Err error-> model.equationContainerTop


        in
          ({model | equationContainerTop = position }, Cmd.none)
    


view : Model -> Html Msg
view model =
    div [ id "elmContainer"] [
        div [id MyCss.EquationsContainer, equationsContainerCss model.selectedMathType , equationsContainerStyles model.selectedMathType model.equationContainerTop  ] [ 
          div [] [
            img [draggable "False",id MyCss.ResizeIcon, onMouseDown (SetTrackMousePointer True), src ( model.baseUrl ++ "images/resizeIcon.svg"), attribute "ondragstart" "return false", attribute "ondrop" "return false"] []
          ],
          div [id MyCss.MathTextEquationContainer] [
            textarea [onInput UpdateEquation, value model.mathEquation, placeholder "equation location", id MyCss.MathEquationText, class [MyCss.ItemsEquationContainer]] [text ""],
            div[id MyCss.SvgContainer,class [MyCss.ItemsEquationContainer]] [
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
           button [onClick (ChangeMathType MathML), (navButtonClass model.selectedMathType MathML )] [text "MathML"],
           button [hidden (NoMathType == model.selectedMathType), onClick SubmitEquation, class [MyCss.NavButton], id MyCss.NavSubmitButton] [text "copy image"]
        ]
        , 
        canvas [id MyCss.HiddenCanvas] []
        ,
        div [id MyCss.CanvasImgContainer] [
          img [id "CanvasImg"] []
        ]
        -- ,
        -- button [id "testButton"][text "test"]
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

equationsContainerCss : MathType -> Attribute Msg
equationsContainerCss  modelMathTypeSelect =
  let
      equal = modelMathTypeSelect ==  NoMathType
  in
    case equal of
      True -> class [MyCss.HideEquationsContainer]
      False -> class []
equationsContainerStyles : MathType -> Int -> Attribute Msg
equationsContainerStyles  modelMathTypeSelect  y =
  let 
      isNotMathType = modelMathTypeSelect ==  NoMathType
  in
    case isNotMathType of
        True -> style[ ("top","100%")]
        --False -> style[ ("top",toString(y) ++"px")]
        False -> style[ ("top","0px")]

{--------------ViewHelperFunc----------------------------------------}

{--------------SubScriptions----------------------------------------}
subscriptions : Model -> Sub Msg
subscriptions model =

  Sub.batch (trackMousePointer(model.trackMousePointerBool) ++  [
      returnBoundingClientRect GotPageYOffset,
      Mouse.ups (\{x, y} -> SetTrackMousePointer(False)  )
    ])

trackMousePointer : Bool -> List (Sub Msg)
trackMousePointer trackMouse =
  case trackMouse of
    True -> [ Mouse.moves (\{x, y} -> MouseChange x y)]
    False -> []
{-----------end-SubScriptions----------------------------------------}
