import { CanvasToImage } from './CanvasToImage.ts'
import { ElmPort } from './ElmPort.ts'
import { MathTypes } from './MathTypes.ts'
declare var MathJax: any;

export class MathJaxConvert {
    convertImageTimer:NodeJS.Timer;
    submitTimer:NodeJS.Timer;
    canvasToImage = new CanvasToImage();
    constructor() {
        
    } 
    queueEquation(ElmObject: ElmPort){
        clearTimeout(this.submitTimer);
        let divIdEquation = ElmObject.selectedMathType + "Equation";
        this.submitTimer = setTimeout(()=>{
            let divEquation = document.getElementById(divIdEquation)
            if(divEquation == null)
                throw("Can't Find the equation id")
            let math = MathJax.Hub.getAllJax(divIdEquation)[0];
            let convertedEquation = this.convertMathTypeOutput(ElmObject);
            if(MathTypes.MathML == ElmObject.selectedMathType){
                divEquation.innerHTML =  convertedEquation
                MathJax.Hub.Queue(["Typeset",MathJax.Hub,divIdEquation]);
            }
            else{
                MathJax.Hub.Queue(["Text",math,convertedEquation]);
            }
        },100);
        
        clearTimeout(this.convertImageTimer);
        
        this.convertImageTimer = setTimeout(()=>{
            this.canvasToImage.convertSvg(divIdEquation,ElmObject.mathEquationColor)
        },500);
        
    }
    convertMathTypeOutput(ElmObject: ElmPort):string{
        let returnEquationString:string = "";

        switch(ElmObject.selectedMathType){
            case MathTypes.MathML:
                returnEquationString = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' + 
                                        ElmObject.mathEquation +
                                        '</math>'
                break;
            case MathTypes.Tex:
                returnEquationString = "{" + ElmObject.mathEquation + "}"  
                break;
            case MathTypes.Ascii:
                returnEquationString = ElmObject.mathEquation
                break;
            default : 
                throw("there was error");
        }
        return returnEquationString;
    }
}