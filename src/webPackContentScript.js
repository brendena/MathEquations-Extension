console.log("_________________________asdasdf")
console.log("------------------------------this might be working")

var browser = browser || chrome;

var mathApp = require('./MathEquation/index');
import ReactDOM from 'react-dom';
require("./MathEquation/lib/custom-mathjax/custom-mathjax.min");





var constructUi = function(configOptions){

    if(configOptions.hasOwnProperty('openCloseMenu')){
        console.log("----1")
        var MathEquationTag = document.getElementsByTagName("math-equations")[0];
        if(MathEquationTag == undefined)
        {
            console.log("----2")
            var paragraph = document.createElement("math-equations");
            document.body.appendChild(paragraph);
            console.log("----3")
        }
        else {
            MathEquationTag.parentNode.removeChild(MathEquationTag);
        }
    }
}


browser.runtime.onMessage.addListener(
	function(request, sender) {
        console.log(request)
        constructUi(request);
    }
);
//*/