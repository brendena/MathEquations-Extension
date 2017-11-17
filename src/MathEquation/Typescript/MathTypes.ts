const enum MathTypes {
    MathML = "MathML",
    Ascii = "AsciiMath",
    Tex = "Tex",
    NoMathType = "NoMathType"
}

let ConvertMathTypes = function(mathTypesString:string):MathTypes{
    let returnType:MathTypes;
    switch(mathTypesString){
        case "MathML":
            returnType = MathTypes.MathML;
            break;   
        case "AsciiMath":
            returnType = MathTypes.Ascii;
            break;
        case "Tex":
            returnType = MathTypes.Tex;
            break;
        case "NoMathType":
            returnType = MathTypes.NoMathType;
            break;
        default:
            throw("you can't have that type");
    }
    return returnType;
}


export {MathTypes, ConvertMathTypes}