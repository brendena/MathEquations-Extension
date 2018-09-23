import { MathEquationAnywhere } from '../../MathEquation/Typescript/MathEquationDiv.ts'


var mathEquationEditorId = "MathEquationElement";
var MathEquationTag :MathEquationAnywhere | undefined; 
export var constructUi = function(configOptions :any){

    if(configOptions.hasOwnProperty('openCloseMenu')){
        if(MathEquationTag == undefined){
            MathEquationTag = new MathEquationAnywhere(chrome.extension.getURL(""));
            document.body.appendChild(MathEquationTag.shadowDom);
        }
        else {
            MathEquationTag.shadowDom.remove();
            MathEquationTag = undefined;
        }
    }
}







chrome.runtime.onMessage.addListener(
	function(request :any, sender :any) {
        //console.log(request)
        constructUi(request);
    }
);
