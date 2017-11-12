module MyCss exposing (..)

import Css exposing (..)
import Css.Elements exposing (..)
import Css.Namespace exposing (namespace)


type CssClasses
    = NavBar
    | NavLogo
    | NavButton
    | NavButtonSelected


type CssIds
    = Page
    | NavContainer
    | EquationsContainer
    | LatexImage
    | ResizeIcon
    | MathTextEquationContainer
    | MathEquationText

userSelect : String -> Style
userSelect i =
    property "user-select" i


heightNavContainer = 100
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
        ]
    , id MathEquationText
        [ height (pct 100)
        , borderWidth (px 0)
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
        , hover
          [ backgroundColor (hex "#aaaa78") ]
        ]
    , class NavButtonSelected
        [ backgroundColor (hex "#aaaa78")    
        ]
    ]


