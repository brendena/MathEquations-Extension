import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';


import { Provider } from "react-redux";
import store from "./js/store/index";

/*
var RenderMathEquation = function()
{
        ReactDOM.render(
                <Provider store={store}>   
                        <App />  
                </Provider>,
                        document.getElementById('root'));
} 
*/


class MathEquations extends HTMLElement {
        connectedCallback() {
                const mountPoint = document.createElement('root');
                this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
                ReactDOM.render(
                        <Provider store={store}>   
                                <App />  
                        </Provider>
                        , mountPoint);
        }

        disconnectedCallback()
        {
                var test = this.getElementById("root");
                ReactDOM.unmountComponentAtNode(test);
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
                
        };

}
console.log(customElements)
console.log(window.customElements )
console.log(window)

customElements.define('math-equations', MathEquations);

//export default RenderMathEquation;