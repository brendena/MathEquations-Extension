port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, on, onClick, onMouseDown, onMouseUp)
import String
import Basics exposing (..)
import Json.Encode exposing (encode, Value, string, int, float, bool, list, object)
import Html.CssHelpers exposing (withNamespace)
import MyCss exposing (..)
--import Debug exposing (log)
import Result


{--------------JsToElm----------------------------------------}


--port returnBoundingClientRect : (String -> msg) -> Sub msg



{--------------JsToElm----------------------------------------}
{--------------ElmToJS----------------------------------------}


port updateEquation : String -> Cmd msg


port closePage : String -> Cmd msg


port downloadImage : String -> Cmd msg

port setEquationContainerOpen : String -> Cmd msg



{--------------ElmToJS----------------------------------------}


type alias Flags =
    { baseUrl : String
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
    , mathEquationColor = "#000000"
    , mathEquationFontSize = intEquationFontSize ImageSizeMedium 
    , downloadFileName = "fileName"
    , downloadFileType = ImageJpg
    , slideMenuOpen = False
    , smallSelect = False
    , equationContainerOpen = True
    }


type alias Model =
    { baseUrl : String
    , trackMousePointerBool : Bool
    , equationContainerTop : Int
    , selectedMathType : MathType
    , mathEquation : String
    , mathEquationColor : String
    , mathEquationFontSize : Int
    , downloadFileName : String
    , downloadFileType : ImageFileType
    , slideMenuOpen : Bool
    , smallSelect : Bool
    , equationContainerOpen: Bool
    }


main : Program Flags Model Msg
main =
    Html.programWithFlags
        { view = view
        , update = update
        , init = init
        , subscriptions = subscriptions
        }


{ id, class, classList } =
    withNamespace "main"


encodeModel : Model -> Value
encodeModel model =
    Json.Encode.object
        [ ( "selectedMathType", Json.Encode.string (toString model.selectedMathType) )
        , ( "mathEquation", Json.Encode.string model.mathEquation )
        , ( "mathEquationColor", Json.Encode.string model.mathEquationColor )
        , ( "downloadFileType", Json.Encode.string (stringImageFileType model.downloadFileType) )
        , ( "mathEquationFonstSize", Json.Encode.string ( toString model.mathEquationFontSize ) )
        ]


type MathType
    = MathML
    | AsciiMath
    | Tex


type ImageFileType
    = ImagePng
    | ImageSvg
    | ImageJpg


stringImageFileType : ImageFileType -> String
stringImageFileType imageFileType =
    case imageFileType of
        ImagePng ->
            "png"

        ImageSvg ->
            "svg"

        ImageJpg ->
            "jpg"

type EquationSize
    = ImageSizeSmall
    | ImageSizeMedium
    | ImageSizeLarge
    | ImageUserDefined


intEquationFontSize : EquationSize -> Int
intEquationFontSize equationSize =
    case equationSize of
        ImageSizeSmall ->
            15

        ImageSizeMedium ->
            40

        ImageSizeLarge ->
            80

        ImageUserDefined ->
            0
            


type Msg
    = UrlChange String
    | ChangeMathType MathType
    | UpdateEquation String
    | ClosePage
    | OnColorChange String
    | SetImageSize Int
    | SetImageSizeInput String
    | ChangeDownloadFileType ImageFileType
    | UpdateDownloadFileName String
    | DownloadImage
    | SetSlideMenuTrueOpen Bool
    | ToggleEnableSmallSelect
    | ToggleEquationContainerVisible


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange urlChange ->
            ( { model | baseUrl = urlChange }, Cmd.none )

        ChangeMathType mathType ->
            let
                newModel =
                    { model | selectedMathType = mathType, smallSelect = False, equationContainerOpen = True }
            in
                ( newModel, updateEquation (encode 0 (encodeModel newModel)) )

        UpdateEquation str ->
            let
                newModel =
                    { model | mathEquation = str, slideMenuOpen = False }
            in
                ( newModel, updateEquation (encode 0 (encodeModel newModel)) )


        ClosePage ->
            ( model, closePage "True" )

        OnColorChange newColor ->
            let
                newModel =
                    { model | mathEquationColor = newColor }
            in
                ( newModel, updateEquation (encode 0 (encodeModel newModel)) )

        SetImageSize imageSize ->
            let
                newModel =
                    { model | mathEquationFontSize = imageSize }
            in
                ( newModel, updateEquation (encode 0 (encodeModel newModel)) )

                
        SetImageSizeInput imageSizeString->
            let
                newModel =
                    { model | mathEquationFontSize = Result.withDefault model.mathEquationFontSize ( String.toInt imageSizeString ) }
            in
                ( newModel, updateEquation (encode 0 (encodeModel newModel)) )
        ChangeDownloadFileType fileType ->
            let
                newModel =
                    { model | downloadFileType = fileType }
            in
                ( newModel, downloadImage (encode 0 (encodeModel newModel)) )

        UpdateDownloadFileName fileName ->
            ( { model | downloadFileName = fileName }, Cmd.none )

        DownloadImage ->
            ( { model | slideMenuOpen = True }, downloadImage (encode 0 (encodeModel model)) )

        SetSlideMenuTrueOpen position ->
            ( { model | slideMenuOpen = position }, Cmd.none )

        ToggleEnableSmallSelect ->
            ( { model
                | smallSelect =
                    if (model.smallSelect) then
                        False
                    else
                        True
              }
            ,Cmd.none   -- setEquationContainerOpen (toString position)
            )
        ToggleEquationContainerVisible ->
            ( { model
                | equationContainerOpen =
                    if (model.equationContainerOpen) then 
                        False
                    else
                        True
              }
            , setEquationContainerOpen (toString model.equationContainerOpen)
            )


slot : List (Attribute msg) -> List (Html msg) -> Html msg
slot attributes children =
    node "slot" attributes children

slotName : String -> Attribute msg
slotName name =
  attribute "name" name

view : Model -> Html Msg
view model =
    div [ id "elmContainer" ]
        [ div [ id MyCss.EquationsContainer, equationsContainerStyles model.equationContainerOpen ]
            [ div []
                [ img [ draggable "False", id MyCss.ResizeIcon, src (model.baseUrl ++ "Img/resizeIcon.svg"), attribute "ondragstart" "return false", attribute "ondrop" "return false" ] []
                ]
            , div [ id MyCss.MathTextEquationContainer ]
                [ textarea [ onInput UpdateEquation, value model.mathEquation, placeholder "equation location", id MyCss.MathEquationText, class [ MyCss.ItemsEquationContainer ] ] [ text "" ]
                , div [ id MyCss.MathOutputContainer, class [ MyCss.ItemsEquationContainer ] ]
                    [div [id MyCss.DisplayEquation] [] 
                    , div [ id MyCss.MathOutputMenu ]
                        [ button [ style [ ( "height", "100%" ) ], id MyCss.NavSubmitButton ] [ text "copy image" ]
                        , span [ id "TestDrag"] [ text "Drag me" ]
                        , input [ onInput OnColorChange, style [ ( "background", "none" ), ( "border", "none" ) ], type_ "color" ] []
                        , button [ class [ MyCss.ImageSizePresetButton ], onClick DownloadImage, id MyCss.OpenDownloadMenu, Html.Attributes.classList [ ( stringFontClasses MyCss.IconDownload, True ) ] ] []
                        , button [ sizeButtonClass model.mathEquationFontSize ImageSizeSmall, style [ ( "font-size", "10px" ) ], iconClass IconPicture, onClick (SetImageSize (intEquationFontSize ImageSizeSmall)) ] []
                        , button [ sizeButtonClass model.mathEquationFontSize ImageSizeMedium, style [ ( "font-size", "20px" ) ], iconClass IconPicture, onClick (SetImageSize (intEquationFontSize ImageSizeMedium)) ] []
                        , button [ sizeButtonClass model.mathEquationFontSize ImageSizeLarge, style [ ( "font-size", "30px" ) ], iconClass IconPicture, onClick (SetImageSize (intEquationFontSize ImageSizeLarge)) ] []
                        , input [id MyCss.MathEquationTextSizeInput, onInput SetImageSizeInput, type_  "number",Html.Attributes.min "1", value <| toString model.mathEquationFontSize ] []
                        ]
                    ]
                ]
            ]
        , div [ id MyCss.OptionsSlideMenu, positionOptionsSlideMenu model.slideMenuOpen ]
            [ div [ onClick (SetSlideMenuTrueOpen False), style [ ( "position", "absolute" ), ( "top", "0px" ), ( "right", "0px" ) ], iconClass MyCss.IconCancel1 ] []
            , div [ class [ MyCss.FlexBoxHorizontalCenter ] ]
                [ input [ onInput UpdateDownloadFileName, value model.downloadFileName, placeholder "fileName", pattern "[a-zA-Z0-9-]+" ] []
                --, button [ fileTypeClass model.downloadFileType ImageSvg, onClick (ChangeDownloadFileType ImageSvg) ] [ text (".svg") ]
                , button [ fileTypeClass model.downloadFileType ImagePng, onClick (ChangeDownloadFileType ImagePng) ] [ text (".png") ]
                , button [ fileTypeClass model.downloadFileType ImageJpg, onClick (ChangeDownloadFileType ImageJpg) ] [ text (".jpg") ]
                , a [ id MyCss.DownloadButton, downloadFilesName model.downloadFileName model.downloadFileType, Html.Attributes.classList [ ( stringFontClasses MyCss.IconDownload, True ) ] ] [ text "download image" ]
                ]
            ]
        , div [ id MyCss.NavContainer ]
            [ img [ id "logo", class [ MyCss.NavLogo ], src (model.baseUrl ++ "Img/logoClearBackground.svg") ] []
            , div [ id MyCss.ContainerMathEquationSelectors, mathEquationSelectorsStyles model ]
                [ 
                    button [ onClick (ChangeMathType Tex), (navButtonClass model.selectedMathType Tex) ]
                     [ img [ id MyCss.LatexImage, src (model.baseUrl ++ "Img/latex.svg") ] []
                    ]

                --    ]
                --  button [ id HiddenSmall , class [ MyCss.NavButton ], onClick ToggleEnableSmallSelect] [ text (toString model.selectedMathType) ]
                --, button [ onClick (ChangeMathType Tex), (navButtonClass model.selectedMathType Tex) ]
                --    [ img [ id MyCss.LatexImage, src (model.baseUrl ++ "Img/latex.svg") ] []
                --    ]
                -- , button [ onClick (ChangeMathType AsciiMath), (navButtonClass model.selectedMathType AsciiMath) ] [ text "AsciiMath" ]
                -- , button [ onClick (ChangeMathType MathML), (navButtonClass model.selectedMathType MathML) ] [ text "MathML" ]
                ]
            , div [ id "NavActionsButtonsContainer" ]
                [ button [onClick ToggleEquationContainerVisible, iconClass MyCss.IconUpOpen, class [ MyCss.NavButton ], equationContainerToggleStyles model.equationContainerOpen] []
                ,    a [ href "https://github.com/brendena/MathEquations-Extension", target "blank" ]
                    [ button [ iconClass MyCss.IconGithubCircled, class [ MyCss.NavButton ] ] []
                    ]
                , button [ onClick ClosePage, class [ MyCss.NavButton ], Html.Attributes.classList [ ( stringFontClasses MyCss.IconCancel1, True ) ] ] []
                ]
            ]
        ]



{--------------ViewHelperFunc----------------------------------------}

equationContainerToggleStyles : Bool -> Attribute Msg
equationContainerToggleStyles open =
    case open of
        True ->
            style [ ( "transform", " rotate(180deg)" ), ("transition", "0.5s") ]

        False ->
            style [ ( "transform", " rotate(0deg)" ) , ("transition", "0.5s") ]


mathEquationSelectorsStyles : Model -> Attribute Msg
mathEquationSelectorsStyles model =
    if (model.smallSelect) then
        class [ MyCss.MathEquationSelectorsOpen ]
    else
        class []


navButtonClass : MathType -> MathType -> Attribute Msg
navButtonClass modelMathTypeSelect mathType =
    let
        equal =
            modelMathTypeSelect == mathType
    in
        case equal of
            True ->
                class [ MyCss.NavButton, MyCss.NavButtonSelected, MyCss.LastOrderNavBar ]

            False ->
                class [ MyCss.NavButton ]


sizeButtonClass : Int -> EquationSize -> Attribute Msg
sizeButtonClass modelEquationSize buttonEquationSize =
    let
        equal =
            modelEquationSize ==  intEquationFontSize buttonEquationSize
    in
        case equal of
            True ->
                class [ MyCss.ImageSizePresetButton, MyCss.SelectedImageSizePresetButton ]

            False ->
                class [ MyCss.ImageSizePresetButton ]


fileTypeClass : ImageFileType -> ImageFileType -> Attribute Msg
fileTypeClass modelImageSizePreset imageSizePreset =
    let
        equal =
            modelImageSizePreset == imageSizePreset
    in
        case equal of
            True ->
                class [ MyCss.ImageSizePresetButton, MyCss.SelectedImageSizePresetButton ]

            False ->
                class [ MyCss.ImageSizePresetButton ]




equationsContainerStyles : Bool -> Attribute Msg
equationsContainerStyles equationContainerOpen =
    case equationContainerOpen of
        True ->
            style [ ("transition", ".5s"), ( "top", "0" ) ]

        False ->
            style [ ("transition", ".5s"),( "top", "0" ),( "transform", "translateY(100%)" )]




iconClass : FontClasses -> Attribute Msg
iconClass font =
    Html.Attributes.classList [ ( stringFontClasses font, True ) ]


downloadFilesName : String -> ImageFileType -> Attribute Msg
downloadFilesName fileName imageFileType =
    let
        fileTypeString =
            stringImageFileType imageFileType

        newFileName =
            if (fileName == "") then
                "fileName"
            else
                fileName
    in
        attribute "download" (newFileName ++ "." ++ fileTypeString)


positionOptionsSlideMenu : Bool -> Attribute Msg
positionOptionsSlideMenu open =
    case open of
        True ->
           -- style [ ( "transform", "translateY(0) translateX(50%)" ) ]
            class [ MyCss.OptionsSlideMenuTransitionOpen ]
        False ->
           -- style [ ( "transform", "translateY(100%) translateX(50%)" ) ]
            class [ MyCss.OptionsSlideMenuTransitionClose ]


{--------------ViewHelperFunc----------------------------------------}
{--------------SubScriptions----------------------------------------}


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        ([ 
        ]
        )





{-----------end-SubScriptions----------------------------------------}
