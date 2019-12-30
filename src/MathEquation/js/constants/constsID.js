import * as log from 'loglevel';

export const MathEquationBox = "MathEquationBox";

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