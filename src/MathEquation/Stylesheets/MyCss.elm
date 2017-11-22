module MyCss exposing (..)

import Css exposing (..)
import Css.Elements exposing (..)
import Css.Namespace exposing (namespace)
import Css.Media exposing (media, mediaQuery, only, print, withMedia)

type CssClasses
    = NavBar
    | NavLogo
    | NavButton
    | NavButtonSelected
    | ItemsEquationContainer
    | HideEquationsContainer
    | ImageSizePresetButton
    | SelectedImageSizePresetButton
    | FlexBoxHorizontalCenter

type CssIds
    = Page
    | NavContainer
    | EquationsContainer
    | LatexImage
    | ResizeIcon
    | MathTextEquationContainer
    | MathEquationText
    | SvgContainer
    | HiddenCanvas
    | NavSubmitButton
    | CanvasImgContainer
    | MathOutputContainer
    | MathOutputMenu
    | DownloadButton
    | OpenDownloadMenu
    | OptionsSlideMenu

type FontClasses
    = IconUpOpen
    | IconGithubCircled
    | IconDownload
    | IconUpload
    | IconDownOpen
    | IconCancel1
    | IconPicture
    | IconDocText

stringFontClasses : FontClasses -> String
stringFontClasses fontClass=
    case fontClass of
        IconUpOpen -> "icon-up-open"
        IconGithubCircled -> "icon-github-circled"
        IconDownload -> "icon-download-1"
        IconUpload -> "icon-upload"
        IconDownOpen -> "icon-down-open"
        IconCancel1 -> "icon-cancel-1"
        IconPicture -> "icon-picture"
        IconDocText -> "icon-doc-test-inv"


userSelect : String -> Style
userSelect i =
    property "user-select" i

transition : String -> Style
transition i =
    property "transition" i


heightNavContainer = 75
navBackgroundColor = "#ffdc78"
primaryAccentColor =
    hex "ccffaa"
css =
    (stylesheet << namespace "main")
    [ class NavLogo 
        [ height (pct 100)
        , backgroundColor (hex "#8064d6")
        , float left
        ]
    , id NavContainer
        [ height (px heightNavContainer)
        , borderTopColor (hex "#000000")
        , borderTopWidth (px 3)
        , borderTopStyle (solid)
        , backgroundColor (hex navBackgroundColor)
        ]
    , id Page
        [ backgroundColor (rgb 200 128 64)
        , color (hex "CCFFFF")
        , width (pct 100)
        , height (pct 100)
        , boxSizing borderBox
        , padding (px 8)
        , margin zero
        ]
    , id LatexImage
        [ height (pct 40)
        ]
    , id EquationsContainer
        [ width (pct 100)
        , position fixed
        , displayFlex
        , flexDirection column
        , bottom (px heightNavContainer)
        , zIndex (int -1)
        , backgroundColor (hex "#ffffff")
        , borderTopStyle solid
        , borderTopWidth (px 1)
        , boxShadow4 (px 0) (px -2) (px 15) (rgba 50 50 50 0.35)
        ]
    , id ResizeIcon
        [ display block
        , margin auto
        , opacity (Css.num 0.5)
        , userSelect "none"
        , cursor nsResize
        , hover
          [ opacity (Css.num 1) ]
        ]
    , id MathTextEquationContainer
        [ flex (int 1)
        , displayFlex
        , flexDirection row
        ]
    
    , id SvgContainer
        [ flex (int 1)
        , padding (px 20)
        , paddingBottom (px 0)
        ]
    , id HiddenCanvas
        [ --display none
          position fixed,
          bottom (px 0),
          right (px 0),
          zIndex (int 5000)
        ]
    , id CanvasImgContainer
        [ --position fixed
        --, bottom (pct -200)
        --, zIndex (int -20)
        ]
    , id MathOutputContainer
        [ displayFlex
        , flexDirection column
        , width (pct 50)
        , borderLeftStyle solid
        , borderLeftWidth (px 1)
        , padding (px 0)
        , paddingBottom (px 5)
        ]
    , id MathOutputMenu
        [ height (px 40)
        , displayFlex
        , alignItems center
        ]
    , id NavSubmitButton
        [ backgroundColor (hex "#FFFFFF")
        , borderWidth (px 0)
        , float left
        , fontSize (px 20)
        , boxSizing borderBox
        , transition "0.5s"
        , hover 
          [ backgroundColor (hex "#b9b9b942")
          , borderStyle solid
          , borderWidth (px 1)
          , borderColor (hex "#000000")
          ]
        ]
    , id OptionsSlideMenu
        [ position  fixed
        , backgroundColor (hex "#FFFFFF")
        , bottom (px 0)
        , width (pct 50)
        , left (pct 25)
        , padding (px 25)
        , paddingBottom (px 0)
        , borderStyle solid
        , borderWidth (px 3)
        , borderBottomWidth (px 0)
        , minHeight (px 90)
        , boxSizing borderBox
        , maxHeight (pct 90)
        , transition ".5s"
        ]
    , class ItemsEquationContainer
        [ width (pct 50)
        , borderWidth (px 0)
        , resize none
        , boxSizing borderBox
        , padding (px 20)
        ]
    , class NavBar
        [ margin zero
        , padding zero
        , children
            [ li
                [ (display inlineBlock) |> important
                , color primaryAccentColor
                ]
            ]
        ]
    , class NavButton
        [ height (pct 100) 
        , paddingLeft (px 10) 
        , paddingRight (px 10) 
        , float left 
        , fontSize (px 30)
        , borderWidth (px 0) 
        , backgroundColor (hex navBackgroundColor) 
        , fontFamilies ["Times New Roman"] 
        , color (hex "#000000") 
        , boxShadow none 
        , hover 
          [ backgroundColor (hex "#aaaa78") ]
        ]
    , class NavButtonSelected
        [ backgroundColor (hex "#aaaa78")    
        ]
    , class HideEquationsContainer
        [ transition "1s"
        ]
    , class ImageSizePresetButton
        [ height (pct 100)
        , backgroundColor (hex "#FFFFFF")
        , border (px 0)
        , boxSizing borderBox
        ]
    , class SelectedImageSizePresetButton
        [ border (px 1)
        , borderStyle solid
        ]
    , class FlexBoxHorizontalCenter
        [ displayFlex
        , justifyContent center
        ]
    --resize mathTexEquation on smaller screen
    , mediaQuery  ["screen and ( max-width: 1000px )"]
        [ id MathTextEquationContainer
            [ flexDirection column ]
        , id MathEquationText
            [ width (pct 100)
            , borderWidth (px 0)
            ]
        , id MathOutputContainer
            [ width (pct 100)
            , flex (int 1)
            , border (px 0)
            , borderTopStyle solid
            , borderTopWidth (px 1)
            ]
        , class ItemsEquationContainer
            [ height (pct 50)
            ]
        ]
    ]


