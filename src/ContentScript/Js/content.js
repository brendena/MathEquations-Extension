var mathEquationEditorId = "MathEquationElement";
var constructUi = function(configOptions){
    console.log("constructing ui")
    


    var MathEquationTag = document.createElement("math-equation-anywhere");
    MathEquationTag.id = mathEquationEditorId
    MathEquationTag.setAttribute("baseurl", chrome.extension.getURL(""));
    MathEquationTag.setAttribute("originurl", window.location.href);

    var addScript = function(scriptName){
        let scriptTag = document.createElement('script');
        scriptTag.src = chrome.extension.getURL(scriptName + ".js")
        document.head.appendChild(scriptTag)
    }

    addScript("mathEquationComponent");
    addScript('webcomponents-loader');

    document.body.appendChild(MathEquationTag)
}





var runtimeFunction = function(request, sender) {
    console.log(request)
    var mathEquationEditor = document.getElementById(mathEquationEditorId);
	if(request.hasOwnProperty('openMenu')){
        if(mathEquationEditor == undefined || mathEquationEditor == null){
            if (document.readyState != 'complete'){
                window.addEventListener("load",constructUi);
            }
            else{
                constructUi(request["openMenu"]);
            }
        }
    }
    else if(request.hasOwnProperty('resetUI')){
        if(mathEquationEditor != undefined || mathEquationEditor != null){
            mathEquationEditor.parentNode.removeChild(mathEquationEditor);
        }
        constructUi(request["resetUI"]);
    };
}



chrome.runtime.onMessage.addListener(
	runtimeFunction
);

constructUi();