import { MathEquationAnywhere } from '../../MathEquation/Typescript/MathEquationComponent.ts'


var mathEquationEditorId = "MathEquationElement";
export var constructUi = function(configOptions :any){

    var addScript = function(scriptName:string){
        let scriptTag = document.createElement('script');
        scriptTag.src = chrome.extension.getURL(scriptName + ".js")
        document.head.appendChild(scriptTag)
    }
    
    addScript("html2canvas.min")
    addScript("mathEquationComponent")

    var MathEquationTag = new MathEquationAnywhere();
    MathEquationTag.id = mathEquationEditorId
    MathEquationTag.setAttribute("baseurl", chrome.extension.getURL(""));

    document.body.appendChild(MathEquationTag)
}







chrome.runtime.onMessage.addListener(
	function(request :any, sender :any) {
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
                if(mathEquationEditor.parentNode != null){
                    mathEquationEditor.parentNode.removeChild(mathEquationEditor);
                }
            }
            constructUi(request["resetUI"]);
        }
    }
);
