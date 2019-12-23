import { ADD_ARTICLE,FOUND_BAD_WORD } from "../constants/action-types";

const forbiddenWords = ["spam", "money"];

const forbiddenWordsMiddleware = (store) => (next) => (action) =>
{
    if(action.type === ADD_ARTICLE){
        const foundWord = forbiddenWords.filter(word =>
            action.payload.title.includes(word)
        );

        if(foundWord.length){

            return store.dispatch({type: FOUND_BAD_WORD});
        }
    }
    return next(action);
}

export {forbiddenWordsMiddleware};