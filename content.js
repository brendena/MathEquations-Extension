console.log("base url");
console.log(chrome.extension.getURL(""))

var MathEquationTag = document.createElement("math-equation-anywhere");
MathEquationTag.setAttribute("baseurl", chrome.extension.getURL(""));
document.body.appendChild(MathEquationTag)


var addScript = function(scriptName){
    var scriptTag = document.createElement('script');
    scriptTag.src = chrome.extension.getURL("MathJaxEvent" + ".js")
    document.body.appendChild(scriptTag);
}




addScript("MathJaxEvent")




