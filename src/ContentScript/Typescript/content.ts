import { MathEquationAnywhere } from '../../MathEquation/Typescript/MathEquationDiv.ts'


var mathEquationEditorId = "MathEquationElement";
export var constructUi = function(configOptions :any){

    console.log("construction ui")
    var MathEquationTag = new MathEquationAnywhere(chrome.extension.getURL(""));

    document.body.appendChild(MathEquationTag.shadowDom);
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
