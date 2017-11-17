'use strict'
/*
new clipboard api 
https://github.com/lgarron/clipboard-polyfill
*/
//var loaded = require("../bower_components/webcomponentsjs/custom-elements-es5-adapter.js");
console.log("mathEquationLoader")
require("../bower_components/webcomponentsjs/webcomponents-loader.js");
//var test = require('./MathEquation/Stylesheets/StylesheetCompiler.elm');

import styles from './MathEquation/Stylesheets/MyCss.css'

/*~~~~~~~~~~~~~~~~~MathJax~CDN~~~~~~~~~~~~~~~~~~~~~~*/
var mathJax = document.createElement('script');
mathJax.src ="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js" 
mathJax.async = true
document.head.appendChild(mathJax)
/*~~~~~~~~~~~~~~~~~MathJax~CDN~~~~~~~~~~~~~~~~~~~~~~*/

/*~~~~~~~~~~~~~~~~~MathJaxConfig~~~~~~~~~~~~~~~~~*/
var mathJaxConfig = document.createElement('script');
mathJaxConfig.type = "text/x-mathjax-config";
//remove the newlines
//https://www.textfixer.com/tools/remove-line-breaks.php
mathJaxConfig.innerHTML = "MathJax.Hub.Config( { jax: ['input/TeX','input/MathML','input/AsciiMath','output/SVG'], extensions: ['tex2jax.js','mml2jax.js','MathEvents.js','asciimath2jax.js','MathZoom.js','AssistiveMML.js'], MathML: { extensions: ['content-mathml.js'] }, TeX: { Macros: { RR: '{\\bf R}', bold: ['{\\bf #1}', 1] } }, tex2jax: { inlineMath: [['$','$'], ['\\(','\\)']], processEscapes: true }, AsciiMath: { fixphi: true, useMathMLspacing: true, displaystyle: false, decimalsign: '.' }, SVG: { mtextFontInherit: true, blacker: 1, linebreaks: { automatic: true }, useFontCache: false }, menuSettings: { zoom: 'Click' }, MatchWebFonts: { matchFor: { SVG: {useFontCache: false} }, fontCheckDelay: 500, fontCheckTimeout: 15 * 1000 }, messageStyle: 'none' } ); console.log('loaded config');";
document.body.appendChild(mathJaxConfig)
/*~~~~~~~~~~~~~~~~~MathJaxConfig~~~~~~~~~~~~~~~~~*/


window.addEventListener('WebComponentsReady', function() {
    console.log("loaded the webComponents")
    require('./MathEquation/Typescript/MathEquationComponent.ts')
});
