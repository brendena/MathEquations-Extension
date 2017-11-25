import {MathTypes, ConvertMathTypes} from './MathTypes.ts'
import { ImageTypesEnum, ImageTypesConstructor} from './ImageTypes.ts'
export class ElmPort {
    constructor(public elmRequest: any) { 
        let elmRequestJson :any = JSON.parse(elmRequest)
        this.selectedMathType = ConvertMathTypes(elmRequestJson["selectedMathType"])
        this.mathEquation = elmRequestJson["mathEquation"]
        this.mathEquationColor = elmRequestJson["mathEquationColor"]
        this.downloadImageType = ImageTypesConstructor(elmRequestJson["downloadFileType"])
        this.equationContainerOpen = elmRequestJson["equationContainerOpen"];
    }
    public GetMathEquationId():string{
        return this.selectedMathType + "Equation"
    }
    public selectedMathType: MathTypes;
    public mathEquation: string;
    public mathEquationColor: string;
    public downloadImageType: ImageTypesEnum;
    public equationContainerOpen: boolean;


}