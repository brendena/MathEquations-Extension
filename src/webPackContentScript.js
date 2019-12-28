console.log("_________________________asdasdf")
console.log("------------------------------this might be working")

var browser = browser || chrome;

var mathApp = require('./MathEquation/index');
import ReactDOM from 'react-dom';
require("./MathEquation/lib/custom-mathjax/custom-mathjax.min");





var constructUi = function(configOptions){

    if(configOptions.hasOwnProperty('openCloseMenu')){
        //console.log(MathJax);
        MathJax.texReset();
        MathJax.startup.document.clear();
        var MathEquationTag = document.getElementById("root");
        if(MathEquationTag == undefined)
        {
            var paragraph = document.createElement("div");
            var nameOfRootName = "root";
            paragraph.id = nameOfRootName;
            document.body.appendChild(paragraph);
            
            mathApp.default();
        }
        else {
            ReactDOM.unmountComponentAtNode(MathEquationTag);
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