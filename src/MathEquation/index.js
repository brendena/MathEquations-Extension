import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';


import { Provider } from "react-redux";
import store from "./js/store/index";

import ReactWebComponent from 'react-web-component';



class RenderMathEquation extends React.Component {
        render() {
          return <Provider store={store}>   
                        <App />  
                </Provider>;
        }
      }


ReactWebComponent.create(<RenderMathEquation />, 'math-equations');