import * as log from 'loglevel';
import * as ConstsID from "./MathEquation/js/constants/constsID"

log.setDefaultLevel("trace")

var browser = browser || chrome;
require('./MathEquation/index');


//require("./MathEquation/lib/custom-mathjax/custom-mathjax.min");






var MathEquationTag = document.createElement("math-equations");


var constructUi = function(configOptions){
    if(configOptions.hasOwnProperty('openCloseMenu')){
        var MathEquationTagAdded = document.getElementsByTagName("math-equations");
        console.log(MathEquationTagAdded);
        console.log(MathEquationTagAdded.length)
        
        if(MathEquationTagAdded.length == 0)
        {
            log.info("opening extension");
            MathEquationTag.style.display = "initial" ;  
            document.body.appendChild(MathEquationTag);

            MathEquationTag.addEventListener(ConstsID.CloseMathExtEventName, function (e) { 
                console.log("hidding the extension")
                //MathEquationTag.parentNode.removeChild(MathEquationTag);
                MathEquationTag.style.display = "none";
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


browser.runtime.onMessage.addListener(
	function(request, sender) {
        log.info(request);
        constructUi(request);
    }
);

//auto load application
constructUi({"openCloseMenu":true})
//*/