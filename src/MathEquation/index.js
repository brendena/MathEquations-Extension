import React from 'react';
import App from './App';
import { Provider } from "react-redux";
import store from "./js/store/index";
import * as Actions from './js/actions/index'
import ReactWebComponent from 'react-web-component';
import * as ConstsID from "./js/constants/constsID"
import * as log from 'loglevel';
import './index.css';



class RenderMathEquation extends React.Component 
{


    webComponentAttributeChanged(props)
    {
        const varPos = 0;
        const oldVal = 1;
        const newVal = 2;
        const namespace = 3;

        log.info("attribute has changed - " + props[varPos]);
        
        try
        {
            var obj = JSON.parse(props[newVal]);
            store.dispatch(Actions.updateAllLocalSyncOptions(obj));
        }
        catch(ex)
        {
            log.error("coudn't parse the [attribute] - " + props[varPos] + " [value] " +  props[newVal]);
            log.error("JS Error - " + ex);
        }
        

    }
    render() {
        return <Provider store={store}>
                        <App />
                </Provider>;
    }
}



ReactWebComponent.create(<RenderMathEquation />, 'math-equations',true,ConstsID.allMathEquationAttributes);