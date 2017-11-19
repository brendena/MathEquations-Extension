'use strict'
/*
new clipboard api 
https://github.com/lgarron/clipboard-polyfill
*/

console.log("mathEquationLoader")
//require("../bower_components/webcomponentsjs/");

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
mathJaxConfig.innerHTML = configMathJax.MathJaxString();
document.body.appendChild(mathJaxConfig)
/*~~~~~~~~~~~~~~~~~MathJaxConfig~~~~~~~~~~~~~~~~~*/


window.addEventListener('WebComponentsReady', function() {
    console.log("loaded the webComponents")
    require('./MathEquation/Typescript/MathEquationComponent.ts')
});
