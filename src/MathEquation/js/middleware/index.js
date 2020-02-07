import * as Consts from "../constants/action-types";
const forbiddenWords = ["spam", "money"];

const handleSettings = (store) => (next) => (action) =>
{
    if(action.type === Consts.UPDATE_WIDTH_MATH_EQUATION || action.type === Consts.UPDATE_IMAGE_DIMENSIONS_SETTINGS)
    {

    }
    return next(action);
}

export {handleSettings};