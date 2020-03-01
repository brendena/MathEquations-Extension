import * as log from 'loglevel';
import * as ConstsID from "./MathEquation/js/constants/constsID"

log.setDefaultLevel("trace")
//log.setDefaultLevel("warn")

var browser = browser || chrome;
require('./MathEquation/index');



var MathEquationTag = document.createElement("math-equations");

var thisPageChangeLocalStorage = false;

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
                log.info("hidding the extension");
                MathEquationTag.style.display = "none";
            }, false);

            MathEquationTag.addEventListener(ConstsID.UpdateLocalSyncProperties, function (e) { 
                log.info("----UpdateLocalSyncProperties");
                thisPageChangeLocalStorage = true;
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

var grabLocalData = function(){
    let gettingItem = browser.storage.local.get(function(data){
        log.info("modifying attribute -" + ConstsID.localSyncAttribute);
        MathEquationTag.setAttribute(ConstsID.localSyncAttribute, JSON.stringify(data))
    });
}

browser.storage.onChanged.addListener(function(chagnedData){
    log.info("----changed local storage");

    //grab all the data
    

    grabLocalData();
    thisPageChangeLocalStorage = false;
});

//auto load application
constructUi({"openCloseMenu":true})
//*/

//grab the local data
if(typeof browser !== "undefined")
{
    grabLocalData();
}