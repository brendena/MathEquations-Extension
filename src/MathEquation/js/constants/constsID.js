import * as log from 'loglevel';

export const MathEquationBox = "MathEquationBox";

//events Out
export const CloseMathExtEventName = "CloseMathEquation";
export const UpdateLocalSyncProperties = "UpdateLocalSyncProperties";

//events Out
export const UpdateMathEquationTextEvent = "UpdateMathEquationTextEvent";

//attributes
export const localSyncAttribute = "local-sync";
export const MarkupLanguageAttribute = "markup-language";
export const allMathEquationAttributes = [localSyncAttribute,MarkupLanguageAttribute]



var tmpUrlImage
var browser =  browser;
if(typeof chrome !== "undefined"  && typeof browser === "undefined"  )
{
    browser = chrome;
}


try
{
    //try and grab the browser get url object
    tmpUrlImage = browser.extension.getURL("") + "Img/";
}
catch
{
    //this is not a extension.  Just use the base url 
    log.debug("not a extension");
    tmpUrlImage = "Img/";
}

export const UrlImage = tmpUrlImage;
