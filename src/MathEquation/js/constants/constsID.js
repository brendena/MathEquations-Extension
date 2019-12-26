export const MathEquationBox = "MathEquationBox";

var tmpUrlImage
if(chrome)
{
    console.log("browser exists");
    tmpUrlImage = chrome.extension.getURL("") + "Img/";
}
else
{
    console.log("not a extension");
    tmpUrlImage = "Img/";
}

export const UrlImage = tmpUrlImage;