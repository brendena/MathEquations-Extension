import * as consts from "../constants/action-types";
import  store  from "../store/index"

export function addArticle(payload) {
    return { type: consts.ADD_ARTICLE, payload }
};

export function changeHeightPage(payload) {
    return { type: consts.CHANGE_HEIGHT_PAGE, payload }
}

export function showMathEquationTextBox(payload) {
    return { type: consts.SHOW_MATH_EQUATION_TEXT_BOX, payload }
}

export function changeSelectedMarkupLanguage(payload) {
    return { type: consts.CHANGE_MARKUP_LANGUAGE, payload }
}

export function updateMathEquationText(payload) {
    return { type: consts.UPDATE_MATH_EQUATION_TEXT, payload }
}

export function updateRenderCanvas(payload) {
    return { type: consts.UPDATE_RENDER_CANVAS, payload }
}

export function updateBase64MathImage(payload) {
    return { type: consts.UPDATE_BASE64_Math_IMAGE, payload }
}
export function updateSVGMathImage(payload) {
    return { type: consts.UPDATE_SVG_MATH_IMAGE, payload }
}
export function updateWidthSizeMathEquation(payload) {
    return { type: consts.UPDATE_WIDTH_MATH_EQUATION, payload }
}
export function updateHeightSizeMathEquation(payload) {
    return { type: consts.UPDATE_HEIGHT_MATH_EQUATION, payload }
}

export function updatePopUiPage(payload) {
    return { type: consts.UPDATE_POP_UI_PAGE, payload }
}

export function updateDownloadImageType(payload) {
    return { type: consts.UPDATE_DOWNLOAD_IMAGE_TYPE, payload }
}

export function updatePageUiType(payload) {
    return { type: consts.UPDATE_POP_UI_TYPE, payload }
}

export function updateMathTextColor(payload) {
    return { type: consts.UPDATE_MATH_TEXT_COLOR, payload }
}



//local sync settings

export function updateAllLocalSyncOptions(payload) {
    return { type: consts.UPDATE_ALL_LOCAL_SYNC_OPTIONS, payload }
}



export function updateImageDimensionsSettings(payload) {
    return { type: consts.UPDATE_IMAGE_DIMENSIONS_SETTINGS, payload }
}

export function updateColorThemes(payload) {
    return { type: consts.UPDATE_COLOR_THEME, payload }
}

export function updateUILocation(payload) {
    return { type: consts.UPDATE_UI_LOCATION, payload }
}

