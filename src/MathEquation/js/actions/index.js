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

export function changeSelectedMathTypeInput(payload) {
    return { type: consts.CHANGE_MATH_TYPE_INPUT, payload }
}

export function changeSelectedMathInput(payload) {
    return { type: consts.CHANGE_MATH_INPUT, payload }
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
export function updateSizeMathEquation(payload) {
    return { type: consts.UPDATE_SIZE_MATH_EQUATION, payload }
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