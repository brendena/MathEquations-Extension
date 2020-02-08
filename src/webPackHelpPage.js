import React from 'react';
import ReactDOM from 'react-dom';
import * as log from 'loglevel';
import * as ConstsID from "./MathEquation/js/constants/constsID"
import HelpPageApp from "./HelpPage/HelpPageIndex"

require('./MathEquation/index');

log.setDefaultLevel("trace")



var MathEquationTag = document.createElement("math-equations");
document.body.appendChild(MathEquationTag);


const element = <HelpPageApp />;
ReactDOM.render(
  element,
  document.getElementById('root')
);