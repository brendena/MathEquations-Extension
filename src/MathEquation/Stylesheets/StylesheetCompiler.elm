port module Stylesheets exposing (..)

import Css.File exposing (CssCompilerProgram, CssFileStructure)
import MyCss as MyCss


port files : CssFileStructure -> Cmd msg


fileStructure : CssFileStructure
fileStructure =
    Css.File.toFileStructure
        [ ( "MyCss.css", Css.File.compile [ MyCss.css ] ) ]


main : CssCompilerProgram
main =
    Css.File.compiler files fileStructure