import * as consts from "../constants/action-types";
import * as constTypes from "../constants/constsTypes"
import produce from "immer"


const initialState = {
    propsPage:{
        height: 30,
        showMathEquationTextBox: true,
        typeMathInput: constTypes.MathEquationInput.latex,
        mathInputString:"",
        updateRenderCanvas: false,
        base64MathImage: ""
    }
};

function rootReducer(state = initialState, action){
    return produce(state,draft =>{
        console.log("changing state - " + action.type)
        if(action.type === consts.ADD_ARTICLE){
            //replace with the actual object
            console.log("changed state")
            draft.articles.concat(action.payload)
            
        }
        else if(action.type === consts.CHANGE_HEIGHT_PAGE)
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
    });
}

export default rootReducer;