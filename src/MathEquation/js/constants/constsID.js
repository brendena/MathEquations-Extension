import * as log from 'loglevel';

export const MathEquationBox = "MathEquationBox";

//events
export const CloseMathExtEventName = "CloseMathEquation";
export const UpdateLocalSyncProperties = "UpdateLocalSyncProperties";


//attributes
export const localSyncAttribute = "local-sync";

export const allMathEquationAttributes = [localSyncAttribute]



var tmpUrlImage
var browser =  browser;
if(browser === undefined || browser === null)
{
    try{
        browser = chrome;
    }
    catch{
        browser = undefined;
    }
}

if(browser)
{
    log.debug("browser exists")
    tmpUrlImage = browser.extension.getURL("") + "Img/";
}
else
{
    log.debug("not a extension")
    tmpUrlImage = "Img/";
}

export const UrlImage = tmpUrlImage;
