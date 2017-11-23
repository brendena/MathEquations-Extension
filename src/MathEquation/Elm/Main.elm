port module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, on, onClick, onMouseDown, onMouseUp)
import String
import Basics exposing (..)
import Json.Encode exposing (encode, Value, string, int, float, bool, list, object)
import Html.CssHelpers exposing (withNamespace)
import MyCss exposing (..)
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



--!!! i don't need to submit a String


port getPageYOffset : String -> Cmd msg


port closePage : String -> Cmd msg


port downloadImage : String -> Cmd msg



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
    , mousePositionY = 0
    , minimizeMenuState = False
    , mathEquationColor = "#000000"
    , imagePreset = MediumImage
    , userDefinedSize = 0
    , downloadFileName = "fileName"
    , downloadFileType = ImageSvg
    , slideMenuOpen = False
    , smallSelect = False
    }


type alias Model =
    { baseUrl : String
    , trackMousePointerBool : Bool
    , equationContainerTop : Int
    , selectedMathType : MathType
    , mathEquation : String
    , mousePositionY : Int
    , minimizeMenuState : Bool
    , mathEquationColor : String
    , imagePreset : ImageSizePresets
    , userDefinedSize : Int
    , downloadFileName : String
    , downloadFileType : ImageFileType
    , slideMenuOpen : Bool
    , smallSelect : Bool
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
        ]


type MathType
    = MathML
    | AsciiMath
    | Tex
    | NoMathType


type ImageSizePresets
    = SmallImage
    | MediumImage
    | LargeImage
    | UserDefined


type ImageFileType
    = ImagePng
    | ImageSvg


stringImageFileType : ImageFileType -> String
stringImageFileType imageFileType =
    case imageFileType of
        ImagePng ->
            "png"

        ImageSvg ->
            "svg"


type Msg
    = UrlChange String
    | MouseChange Int Int
    | SetTrackMousePointer Bool
    | ChangeMathType MathType
    | UpdateEquation String
    | SubmitEquation
    | GotPageYOffset String
    | ClosePage
    | OnColorChange String
    | SetSizeImagePresets ImageSizePresets
    | UserDefinedSize Int
    | ChangeDownloadFileType ImageFileType
    | UpdateDownloadFileName String
    | DownloadImage
    | SetSlideMenuTrueOpen Bool
    | ToggleEnableSmallSelect


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange urlChange ->
            ( { model | baseUrl = urlChange }, Cmd.none )

        MouseChange x y ->
            let
                _ =
                    1

                --+ Debug.log "testing"  y
                --test = Debug.log "window height" Window.size
            in
                ( { model | mousePositionY = y }, getPageYOffset (toString (y)) )

        SetTrackMousePointer set ->
            ( { model | trackMousePointerBool = set }, Cmd.none )

        ChangeMathType mathType ->
            let
                newMathType =
                    if (model.selectedMathType == mathType) then
                        NoMathType
                    else
                        mathType

                newModel =
                    { model | selectedMathType = newMathType, smallSelect = False }
            in
                ( newModel, updateEquation (encode 0 (encodeModel newModel)) )

        UpdateEquation str ->
            let
                newModel =
                    { model | mathEquation = str, slideMenuOpen = False }
            in
                ( newModel, updateEquation (encode 0 (encodeModel newModel)) )

        SubmitEquation ->
            ( model, sumitEquation (encode 0 (encodeModel model)) )

        GotPageYOffset offsetString ->
            let
                --test = decodeString (field "name" string) "{ \"name\": \"tom\" }"
                convert =
                    String.toInt offsetString

                position =
                    case convert of
                        Ok offset ->
                            model.mousePositionY - offset

                        Err error ->
                            model.equationContainerTop
            in
                ( { model | equationContainerTop = position }, Cmd.none )

        ClosePage ->
            ( model, closePage "True" )

        OnColorChange newColor ->
            let
                newModel =
                    { model | mathEquationColor = newColor }
            in
                ( newModel, updateEquation (encode 0 (encodeModel newModel)) )

        SetSizeImagePresets imagePreset ->
            let
                newModel =
                    { model | imagePreset = imagePreset }
            in
                ( newModel, updateEquation (encode 0 (encodeModel newModel)) )

        UserDefinedSize sizeInt ->
            let
                newModel =
                    { model | userDefinedSize = sizeInt }
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
            , Cmd.none
            )


view : Model -> Html Msg
view model =
    div [ id "elmContainer" ]
        [ div [ id MyCss.EquationsContainer, equationsContainerCss model.selectedMathType, equationsContainerStyles model.selectedMathType model.equationContainerTop ]
            [ div []
                [ img [ draggable "False", id MyCss.ResizeIcon, onMouseDown (SetTrackMousePointer True), src (model.baseUrl ++ "Img/resizeIcon.svg"), attribute "ondragstart" "return false", attribute "ondrop" "return false" ] []
                ]
            , div [ id MyCss.MathTextEquationContainer ]
                [ textarea [ onInput UpdateEquation, value model.mathEquation, placeholder "equation location", id MyCss.MathEquationText, class [ MyCss.ItemsEquationContainer ] ] [ text "" ]
                , div [ id MyCss.MathOutputContainer, class [ MyCss.ItemsEquationContainer ] ]
                    [ div [ id MyCss.SvgContainer ]
                        [ p [ id "AsciiMathEquation", hidden (AsciiMath /= model.selectedMathType) ] [ text "Ascii `` " ]
                        , p [ id "TexEquation", hidden (Tex /= model.selectedMathType) ] [ text "Tex ${ }$ " ]
                        , div [ hidden (MathML /= model.selectedMathType) ]
                            [ p [] [ text "MathML" ]
                            , p [ id "MathMLEquation" ] [ text "" ]
                            ]
                        ]
                    , div [ id MyCss.MathOutputMenu ]
                        [ button [ onClick SubmitEquation, style [ ( "height", "100%" ) ], id MyCss.NavSubmitButton ] [ text "copy image" ]
                        , input [ onInput OnColorChange, style [ ( "background", "none" ), ( "border", "none" ) ], type_ "color" ] []
                        , button [ class [ MyCss.ImageSizePresetButton ], onClick DownloadImage, id MyCss.OpenDownloadMenu, Html.Attributes.classList [ ( stringFontClasses MyCss.IconDownload, True ) ] ] []
                        , button [ sizeButtonClass model.imagePreset SmallImage, style [ ( "font-size", "10px" ) ], iconClass IconPicture, onClick (SetSizeImagePresets SmallImage) ] []
                        , button [ sizeButtonClass model.imagePreset MediumImage, style [ ( "font-size", "20px" ) ], iconClass IconPicture, onClick (SetSizeImagePresets MediumImage) ] []
                        , button [ sizeButtonClass model.imagePreset LargeImage, style [ ( "font-size", "30px" ) ], iconClass IconPicture, onClick (SetSizeImagePresets LargeImage) ] []
                        ]
                    ]
                ]
            ]
        , div [ id MyCss.OptionsSlideMenu, positionOptionsSlideMenu model.slideMenuOpen ]
            [ div [ onClick (SetSlideMenuTrueOpen False), style [ ( "position", "absolute" ), ( "top", "0px" ), ( "right", "0px" ) ], iconClass MyCss.IconCancel1 ] []
            , div [ class [ MyCss.FlexBoxHorizontalCenter ] ]
                [ input [ onInput UpdateDownloadFileName, value model.downloadFileName, placeholder "fileName", pattern "[a-zA-Z0-9-]+" ] []
                , button [ fileTypeClass model.downloadFileType ImageSvg, onClick (ChangeDownloadFileType ImageSvg) ] [ text (".svg") ]
                , button [ fileTypeClass model.downloadFileType ImagePng, onClick (ChangeDownloadFileType ImagePng) ] [ text (".png") ]
                , a [ id MyCss.DownloadButton, downloadFilesName model.downloadFileName model.downloadFileType, Html.Attributes.classList [ ( stringFontClasses MyCss.IconDownload, True ) ] ] [ text "download image" ]
                ]
            ]
        , div [ id MyCss.NavContainer ]
            [ img [ id "logo", class [ MyCss.NavLogo ], src (model.baseUrl ++ "Img/logoClearBackground.svg") ] []
            , div [ id MyCss.ContainerMathEquationSelectors, mathEquationSelectorsStyles model ]
                [ button
                    [ id HiddenSmall
                    , class [ MyCss.NavButton ]
                    , onClick ToggleEnableSmallSelect
                    ]
                    [ text (toString model.selectedMathType) ]
                , button [ onClick (ChangeMathType Tex), (navButtonClass model.selectedMathType Tex) ]
                    [ img [ id MyCss.LatexImage, src (model.baseUrl ++ "Img/latex.svg") ] []
                    ]
                , button [ onClick (ChangeMathType AsciiMath), (navButtonClass model.selectedMathType AsciiMath) ] [ text "AsciiMath" ]
                , button [ onClick (ChangeMathType MathML), (navButtonClass model.selectedMathType MathML) ] [ text "MathML" ]
                ]
            , div [ id "NavActionsButtonsContainer" ]
                [ a [ href "https://github.com/brendena/MathEquations-Extension", target "blank" ]
                    [ button [ iconClass MyCss.IconGithubCircled, class [ MyCss.NavButton ] ] []
                    ]
                , button [ onClick ClosePage, class [ MyCss.NavButton ], Html.Attributes.classList [ ( stringFontClasses MyCss.IconCancel1, True ) ] ] []
                ]
            ]
        , canvas [ id MyCss.HiddenCanvas, sizeCanvas model.imagePreset model.userDefinedSize ] []
        ]



{--------------ViewHelperFunc----------------------------------------}


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


sizeButtonClass : ImageSizePresets -> ImageSizePresets -> Attribute Msg
sizeButtonClass modelImageSizePreset imageSizePreset =
    let
        equal =
            modelImageSizePreset == imageSizePreset
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


equationsContainerCss : MathType -> Attribute Msg
equationsContainerCss modelMathTypeSelect =
    let
        equal =
            modelMathTypeSelect == NoMathType
    in
        case equal of
            True ->
                class [ MyCss.HideEquationsContainer ]

            False ->
                class []


equationsContainerStyles : MathType -> Int -> Attribute Msg
equationsContainerStyles modelMathTypeSelect y =
    let
        isNotMathType =
            modelMathTypeSelect == NoMathType
    in
        case isNotMathType of
            True ->
                style [ ( "top", "0" ), ( "transform", "translateY(100%)" ) ]

            False ->
                style [ ( "top", "0" ) ]


sizeCanvas : ImageSizePresets -> Int -> Attribute Msg
sizeCanvas imageSizePreset userDefinedSize =
    let
        sizeCanvas =
            case imageSizePreset of
                SmallImage ->
                    "200"

                MediumImage ->
                    "400"

                LargeImage ->
                    "1000"

                UserDefined ->
                    (toString userDefinedSize)
    in
        attribute "width" sizeCanvas


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
            style [ ( "transform", "translateY(0) translateX(50%)" ) ]

        False ->
            style [ ( "transform", "translateY(100%) translateX(50%)" ) ]



{--------------ViewHelperFunc----------------------------------------}
{--------------SubScriptions----------------------------------------}


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        (trackMousePointer (model.trackMousePointerBool)
            ++ [ returnBoundingClientRect GotPageYOffset
               , Mouse.ups (\{ x, y } -> SetTrackMousePointer (False))
               ]
        )


trackMousePointer : Bool -> List (Sub Msg)
trackMousePointer trackMouse =
    case trackMouse of
        True ->
            [ Mouse.moves (\{ x, y } -> MouseChange x y) ]

        False ->
            []



{-----------end-SubScriptions----------------------------------------}
