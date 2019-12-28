import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';


import { Provider } from "react-redux";
import store from "./js/store/index";

var RenderMathEquation = function()
{
        ReactDOM.render(
                <Provider store={store}>   
                        <App />  
                </Provider>,
                        document.getElementById('root'));
} 



export default RenderMathEquation;