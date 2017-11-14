console.log("working5");

console.log(chrome.extension.getURL(""))

var div = document.createElement("div");
div.id = "test";
div.style.width = "100%";
div.style.position = "fixed"
div.style.bottom = "0"
div.style.left = "0"
div.style.background = "white";
div.style.zIndex = "2000"

var app = Elm.Main.embed(div);

document.body.appendChild(div);

/*~~~~~~~~~~~~~~~~~MathJax~CDN~~~~~~~~~~~~~~~~~~~~~~*/
var mathJax = document.createElement('script');
mathJax.src ="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js" //chrome.extension.getURL("MathJax/MathJax.js")
mathJax.async = true
document.body.appendChild(mathJax);
/*~~~~~~~~~~~~~~~~~MathJax~CDN~~~~~~~~~~~~~~~~~~~~~~*/

/*~~~~~~~~~~~~~~~~~MathJaxConfig~~~~~~~~~~~~~~~~~*/
var mathJaxConfig = document.createElement('script');
mathJaxConfig.type = "text/x-mathjax-config";
//remove the newlines
//https://www.textfixer.com/tools/remove-line-breaks.php
mathJaxConfig.innerHTML = "MathJax.Hub.Config( { jax: ['input/TeX','input/MathML','input/AsciiMath','output/SVG'], extensions: ['tex2jax.js','mml2jax.js','MathEvents.js','asciimath2jax.js','MathZoom.js','AssistiveMML.js'], MathML: { extensions: ['content-mathml.js'] }, TeX: { Macros: { RR: '{\\bf R}', bold: ['{\\bf #1}', 1] } }, tex2jax: { inlineMath: [['$','$'], ['\\(','\\)']], processEscapes: true }, AsciiMath: { fixphi: true, useMathMLspacing: true, displaystyle: false, decimalsign: '.' }, SVG: { mtextFontInherit: true, blacker: 1, linebreaks: { automatic: true }, useFontCache: false }, menuSettings: { zoom: 'Click' }, MatchWebFonts: { matchFor: { SVG: {useFontCache: false} }, fontCheckDelay: 500, fontCheckTimeout: 15 * 1000 }, messageStyle: 'none' } ); console.log('loaded config');";
document.body.appendChild(mathJaxConfig);
/*~~~~~~~~~~~~~~~~~MathJaxConfig~~~~~~~~~~~~~~~~~*/

/*~~~~~~~~~~~~~~~~~MathJax~Event~~~~~~~~~~~~~~~~~~~~~~*/
var mathJaxEvent = document.createElement('script');
mathJaxEvent.src = chrome.extension.getURL("MathJaxEvent.js")
document.body.appendChild(mathJaxEvent);
/*~~~~~~~~~~~~~~~~~MathJax~Event~~~~~~~~~~~~~~~~~~~~~~*/


var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('StyleSheets/MyCss.css');
(document.head||document.documentElement).appendChild(style);

