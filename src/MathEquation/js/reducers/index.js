import * as consts from "../constants/action-types";
import * as constTypes from "../constants/constsTypes"
import * as log from 'loglevel';
import produce from "immer"


const initialState = {
    //properties of the page that will not be synced across all instances of the browser
    propsPage:{
        height: 30,
        showMathEquationTextBox: true,
        typeMathInput: constTypes.MathEquationInput.latex,
        sizeMathOutput: constTypes.MathSizeMedium,
        mathInputString:"",
        mathTextColor:"0x000000",
        updateRenderCanvas: false,
        popUpUiPage: true,
        downloadImageType: constTypes.ImageDownloadType.png,
        popUiType :  constTypes.PopUpUi.SettingsPage,
        base64MathImage: "",
        svgMathImage:""
        
    },
    //properties that will be locally synced
    localSync:{
        imageDimensionsSettings: constTypes.ImageDimensionsSettings.UserDefinedHeight
    }
};

function rootReducer(state = initialState, action){
    return produce(state,draft =>{
        log.info("changing state - " + action.type);
        //page settings
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
            draft.propsPage.sizeMathOutput = action.payload;
        }
        else if(action.type === consts.UPDATE_POP_UI_PAGE)
        {
            if(action.payload === constTypes.TrueFalseToggle.toggle)
            {
                draft.propsPage.popUpUiPage = !draft.propsPage.popUpUiPage;
            }
            else
            {
                draft.propsPage.popUpUiPage = action.payload;
            }
            
        }
        else if(action.type === consts.UPDATE_DOWNLOAD_IMAGE_TYPE)
        {
            draft.propsPage.downloadImageType = action.payload;
        }
        else if(action.type === consts.UPDATE_POP_UI_TYPE)
        {
            draft.propsPage.popUiType = action.payload;
        }
        else if(action.type === consts.UPDATE_MATH_TEXT_COLOR)
        {
            draft.propsPage.mathTextColor = action.payload;
        }
        //local sync
        else if(action.type === consts.UPDATE_IMAGE_DIMENSIONS_SETTINGS)
        {
            draft.localSync.imageDimensionsSettings = action.payload;
        }
    });
}

export default rootReducer;