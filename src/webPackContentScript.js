import * as log from 'loglevel';
log.setDefaultLevel("trace")



var browser = browser || chrome;
var mathApp = require('./MathEquation/index');
require("./MathEquation/lib/custom-mathjax/custom-mathjax.min");

import ReactDOM from 'react-dom';











var constructUi = function(configOptions){

    if(configOptions.hasOwnProperty('openCloseMenu')){
        var MathEquationTag = document.getElementsByTagName("math-equations")[0];
        if(MathEquationTag == undefined)
        {
            var paragraph = document.createElement("math-equations");
            document.body.appendChild(paragraph);
        }
        else {
            MathEquationTag.parentNode.removeChild(MathEquationTag);
        }
    }
}


browser.runtime.onMessage.addListener(
	function(request, sender) {
        log.info(request);
        constructUi(request);
    }
);

//auto load application
constructUi({"openCloseMenu":true})
//*/