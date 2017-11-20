'use strict'


import styles from './MathEquation/Stylesheets/MyCss.css'
import styles from './MathEquation/Stylesheets/fontello/css/animation.css'
import styles from './MathEquation/Stylesheets/fontello/css/fontello-codes.css'
import styles from './MathEquation/Stylesheets/fontello/css/fontello.css'

/*~~~~~~~~~~~~~~~~~MathJax~CDN~~~~~~~~~~~~~~~~~~~~~~*/
var mathJax = document.createElement('script');
mathJax.src ="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js" 
mathJax.async = true
document.head.appendChild(mathJax)
/*~~~~~~~~~~~~~~~~~MathJax~CDN~~~~~~~~~~~~~~~~~~~~~~*/

/*~~~~~~~~~~~~~~~~~MathJaxConfig~~~~~~~~~~~~~~~~~*/
var configMathJax = require ('./MathEquation/Js/MathJaxConfig.js')
var mathJaxConfig = document.createElement('script');
mathJaxConfig.type = "text/x-mathjax-config";
//load in fonts
var currentScript = document.currentScript
var fontType = currentScript.getAttribute("math-jax-font");
if(fontType == null || fontType == undefined)
    fontType = "STIX-Web";
mathJaxConfig.innerHTML = configMathJax.MathJaxString(fontType);
document.body.appendChild(mathJaxConfig)
/*~~~~~~~~~~~~~~~~~MathJaxConfig~~~~~~~~~~~~~~~~~*/


window.addEventListener('WebComponentsReady', function() {
    require('./MathEquation/Typescript/MathEquationComponent.ts')
});
