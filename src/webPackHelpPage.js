import * as log from 'loglevel';
import * as ConstsID from "./MathEquation/js/constants/constsID"
import './HelpPage/styles.css';

log.setDefaultLevel("trace")

require('./MathEquation/index');

var MathEquationTag = document.createElement("math-equations");
document.body.appendChild(MathEquationTag);