import * as log from 'loglevel';

export const MathEquationBox = "MathEquationBox";
export const CloseMathExtEventName = "CloseMathEquation";
export const UpdateLocalSyncProperties = "UpdateLocalSyncProperties";

var tmpUrlImage
var browser = undefined;//= browser || chrome || undefined;
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
