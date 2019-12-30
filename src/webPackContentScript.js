import * as log from 'loglevel';
import * as ConstsID from "./MathEquation/js/constants/constsID"

log.setDefaultLevel("trace")

console.log("---------ttest")
console.log(window)

var browser = browser || chrome;
require('./MathEquation/index');


require("./MathEquation/lib/custom-mathjax/custom-mathjax.min");

import ReactDOM from 'react-dom';





var MathEquationTag = document.createElement("math-equations");


var constructUi = function(configOptions){
    if(configOptions.hasOwnProperty('openCloseMenu')){
        var MathEquationTagAdded = document.getElementsByTagName("math-equations")[0];
        
        
        if(MathEquationTagAdded == undefined)
        {
            log.info("opening extension");
            MathEquationTag.style.display = "initial" ;  
            document.body.appendChild(MathEquationTag);

            MathEquationTag.addEventListener(ConstsID.CloseMathExtEventName, function (e) { 
                console.log("removing extension from ui")
                MathEquationTag.parentNode.removeChild(MathEquationTag);
             }, false);
        }
        else{
            if(MathEquationTag.style.display === "initial")
            {
                log.info("opening extension");
                MathEquationTag.style.display = "none";
            }
            else {
                log.info("removing extension from browser action");
                MathEquationTag.style.display = "initial";
                //MathEquationTag.parentNode.removeChild(MathEquationTag);
            }
        }
    }
}

console.log("----testase")

browser.runtime.onMessage.addListener(
	function(request, sender) {
        log.info(request);
        constructUi(request);
    }
);

//auto load application
console.log("test")
constructUi({"openCloseMenu":true})
//*/