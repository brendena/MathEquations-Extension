import * as log from 'loglevel';

export const MathEquationBox = "MathEquationBox";
export const CloseMathExtEventName = "CloseMathEquation";
export const UpdateLocalSyncProperties = "UpdateLocalSyncProperties";

var tmpUrlImage
if(chrome)
{
    log.debug("browser exists")
    tmpUrlImage = chrome.extension.getURL("") + "Img/";
}
else
{
    log.debug("not a extension")
    tmpUrlImage = "Img/";
}

export const UrlImage = tmpUrlImage;
