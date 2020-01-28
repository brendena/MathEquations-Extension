import * as consts from "../constants/action-types";
import * as constTypes from "../constants/constsTypes"
import * as log from 'loglevel';
import produce from "immer"


const initialState = {
    propsPage:{
        height: 30,
        showMathEquationTextBox: true,
        typeMathInput: constTypes.MathEquationInput.latex,
        sizeMathOutput: constTypes.MathSizeMedium,
        mathInputString:"",
        updateRenderCanvas: false,
        downloadImagePage: false,
        downloadImageType: constTypes.ImageDownloadType.png,
        popUiType :  constTypes.PopUpUi.DownloadImagePage,
        base64MathImage: "",
        svgMathImage:"",

    }
};

function rootReducer(state = initialState, action){
    return produce(state,draft =>{
        log.info("changing state - " + action.type);
        
        if(action.type === consts.CHANGE_HEIGHT_PAGE)
        {
            draft.propsPage.height = action.payload;
        }
        else if(action.type === consts.SHOW_MATH_EQUATION_TEXT_BOX)
        {
            draft.propsPage.showMathEquationTextBox = action.payload;
        }
        else if(action.type === consts.CHANGE_MATH_TYPE_INPUT)
        {
            draft.propsPage.typeMathInput = action.payload;
        }
        else if(action.type === consts.CHANGE_MATH_INPUT)
        {
            draft.propsPage.mathInputString = action.payload;
        }
        else if(action.type === consts.UPDATE_RENDER_CANVAS)
        {
            draft.propsPage.updateRenderCanvas = action.payload;
        }
        else if(action.type === consts.UPDATE_BASE64_Math_IMAGE)
        {
            draft.propsPage.base64MathImage = action.payload;
        }
        else if(action.type === consts.UPDATE_SVG_MATH_IMAGE)
        {
            draft.propsPage.svgMathImage = action.payload;
        }
        else if(action.type === consts.UPDATE_SIZE_MATH_EQUATION)
        {
            console.log("testing");
            console.log(action.payload);
            draft.propsPage.sizeMathOutput = action.payload;
        }
        else if(action.type === consts.UPDATE_DOWNLOAD_IMAGE_PAGE)
        {
            draft.propsPage.downloadImagePage = action.payload;
        }
        else if(action.type === consts.UPDATE_DOWNLOAD_IMAGE_TYPE)
        {
            draft.propsPage.downloadImageType = action.payload;
        }
        else if(action.type === consts.UPDATE_POP_UI_TYPE)
        {
            draft.propsPage.popUiType = action.payload;
        }
    });
}

export default rootReducer;