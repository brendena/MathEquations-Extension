'use strict'
/*
new clipboard api 
https://github.com/lgarron/clipboard-polyfill
*/
//var loaded = require("../bower_components/webcomponentsjs/custom-elements-es5-adapter.js");

var testLoaded = require("../bower_components/webcomponentsjs/webcomponents-loader.js");
var Elm = require('./MathEquation/Elm/Main.elm');
var ElmStylesheet = require('./MathEquation/Stylesheets/StylesheetCompiler.elm');



console.log("MathEquations")
window.addEventListener('WebComponentsReady', function() {
    console.log("loaded the webComponents")
    document.getElementsByTagName("MathEquationElement")
    require('./MathEquation/Typescript/MathEquationComponent.ts')

});
