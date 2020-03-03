import * as consts from "../constants/action-types";
import * as constTypes from "../constants/constsTypes"
import * as ConstsID from "../constants/constsID"
import * as log from 'loglevel';
import produce from "immer"
import ThemeColors from "../types/ThemeColors"

const initialState = {
    //properties of the page that will not be synced across all instances of the browser
    propsPage:{
        height: 30,
        showMathEquationTextBox: true,
        selectedMarkupLanguage: constTypes.MarkupLanguages.latex,
        widthMathOutput: constTypes.MathSizeMedium,
        heightMathOutput: 100,
        mathEquationText:"",
        mathTextColor:"0x000000",
        updateRenderCanvas: false,
        popUpUiPage: false,
        downloadImageType: constTypes.ImageDownloadType.png,
        popUiType :  constTypes.PopUpUi.NoPage,
        base64MathImage: "",
        svgMathImage:""
        
    },
    //properties that will be locally synced
    localSync:{
        imageDimensionsSettings: constTypes.ImageDimensionsSettings.UserDefinedWidth,
        themeColors: new ThemeColors()
    }
};

function rootReducer(state = initialState, action){
    var updateLocalSyncObject = false;
    var newState = produce(state,draft =>{
        
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
        else if(action.type === consts.CHANGE_MARKUP_LANGUAGE)
        {
            draft.propsPage.selectedMarkupLanguage = action.payload;
        }
        else if(action.type === consts.UPDATE_MATH_EQUATION_TEXT)
        {
            draft.propsPage.mathEquationText = action.payload;
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
        else if(action.type === consts.UPDATE_WIDTH_MATH_EQUATION)
        {
            draft.propsPage.widthMathOutput = action.payload;
        }
        else if(action.type === consts.UPDATE_HEIGHT_MATH_EQUATION)
        {
            draft.propsPage.heightMathOutput = action.payload;
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
            if(draft.propsPage.popUpUiPage == false)
            {
                draft.propsPage.popUiType = constTypes.PopUpUi.NoPage;
            }
        }
        else if(action.type === consts.UPDATE_DOWNLOAD_IMAGE_TYPE)
        {
            draft.propsPage.downloadImageType = action.payload;
        }
        else if(action.type === consts.UPDATE_POP_UI_TYPE)
        {
            if(draft.propsPage.popUiType != action.payload)
            {
                draft.propsPage.popUpUiPage = true;
                draft.propsPage.popUiType = action.payload;
            }
            else
            {
                draft.propsPage.popUpUiPage = false;
                draft.propsPage.popUiType = constTypes.PopUpUi.NoPage;
            }
        }
        else if(action.type === consts.UPDATE_MATH_TEXT_COLOR)
        {
            draft.propsPage.mathTextColor = action.payload;
        }
        //local sync
        else if(action.type === consts.UPDATE_ALL_LOCAL_SYNC_OPTIONS)
        {
            draft.localSync = action.payload;
        }
        else if(action.type === consts.UPDATE_IMAGE_DIMENSIONS_SETTINGS)
        {
            draft.localSync.imageDimensionsSettings = action.payload;
            updateLocalSyncObject = true;
        }
        else if(action.type === consts.UPDATE_COLOR_THEME)
        {
            draft.localSync.themeColors = action.payload;
            updateLocalSyncObject = true;
        }



    });

    if(updateLocalSyncObject === true)
    {
        log.info("updateLocalSyncObject");
        //grab the components tag and send out a event
        var componentsTag = document.getElementsByTagName("math-equations");
        if(componentsTag.length == 1)
        {   
            var event = new Event(ConstsID.UpdateLocalSyncProperties, {"bubbles":true,"composed":true});
            event.data = newState.localSync;
            log.info("[event]" + ConstsID.UpdateLocalSyncProperties);
            componentsTag[0].dispatchEvent(event);
        }
    }

    

    return newState;
}

export default rootReducer;