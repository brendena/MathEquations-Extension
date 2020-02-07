import { createStore, applyMiddleware } from "redux";
import rootReducer  from "../reducers/index";
import  { handleSettings}   from "../middleware/index";
const store = createStore(rootReducer,
    applyMiddleware(handleSettings)
    );

export default store;

//,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //middle wear for a 