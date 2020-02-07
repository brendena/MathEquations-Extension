import * as log from 'loglevel';
import * as ConstsID from "./MathEquation/js/constants/constsID"

log.setDefaultLevel("trace")
//log.setDefaultLevel("warn")

var browser = browser || chrome;
require('./MathEquation/index');



var MathEquationTag = document.createElement("math-equations");


var constructUi = function(configOptions){
    if(configOptions.hasOwnProperty('openCloseMenu')){
        log.info("openCloseMenu");
        var MathEquationTagAdded = document.getElementsByTagName("math-equations");
        
        if(MathEquationTagAdded.length == 0)
        {
            log.info("opening extension");
            MathEquationTag.style.display = "initial" ;  
            document.body.appendChild(MathEquationTag);

            MathEquationTag.addEventListener(ConstsID.CloseMathExtEventName, function (e) { 
                console.log("hidding the extension");
                //MathEquationTag.parentNode.removeChild(MathEquationTag);
                MathEquationTag.style.display = "none";
            }, false);

            MathEquationTag.addEventListener(ConstsID.UpdateLocalSyncProperties, function (e) { 
                console.log("Got a update to change properties");
                console.log(e.data)
                browser.storage.local.set(e.data);
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

browser.storage.onChanged.addListener(function(chagnedData){
    console.log(data)
    console.log("-------------somebody changed local storage")
    /*
    //firefox way of doing it
    let gettingItem = browser.storage.local.get(function(data){
        console.log("open got the info")
    });

    gettingItem.then(function(data){
        console.log("open got the info")
    }, function(error){
        console.log("failed to open");
    });
    */
    //grab all the data
    let gettingItem = browser.storage.local.get(function(data){
        console.log("open got the info")
        console.log(data)
    });
});

//auto load application
constructUi({"openCloseMenu":true})
//*/