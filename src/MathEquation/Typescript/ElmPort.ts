import {MathTypes, ConvertMathTypes} from './MathTypes.ts'

export class ElmPort {
    constructor(public elmRequest: any) { 
        let elmRequestJson :any = JSON.parse(elmRequest)
        this.selectedMathType = ConvertMathTypes(elmRequestJson["selectedMathType"])
        this.mathEquation = elmRequestJson["mathEquation"]
    }
    public selectedMathType: MathTypes;
    public mathEquation: string


}