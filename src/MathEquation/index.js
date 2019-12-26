import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';

//need to import it here for everybody else
import * as MathJax from "./lib/custom-mathjax/custom-mathjax.min"

import { Provider } from "react-redux";
import store from "./js/store/index";

ReactDOM.render(
            <div id="test">
            <Provider store={store}>   
                    <App />  
            </Provider>
            </div>,
             document.getElementById('root'));

