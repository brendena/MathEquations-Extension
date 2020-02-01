import React from "react";
import * as Actions from '../actions/index'
import * as ConstTypes from "../constants/constsTypes"
import * as ConstsID from "../constants/constsID"
import  store  from "../store/index"
import * as log from 'loglevel';

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faWindowClose, faChevronUp, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SelectedMathType extends React.Component{
    constructor(props){
        super(props);
        this.toggleMathEquationBoxShow = this.toggleMathEquationBoxShow.bind(this);
        this.closeExtension = this.closeExtension.bind(this);
        this.closeButton = React.createRef();
    }

    changeSelectedInput(typeInput){
        store.dispatch(Actions.changeSelectedMathTypeInput(typeInput));
    }

    render(){
        var stylesSlideMathTextBox = { transform: "rotate(0deg)"}
        if(this.props.stateMathTextBox)
        {
            stylesSlideMathTextBox.transform = "rotate(180deg)"
        }

        var latexButtonClassName= "navButton";
        var mathMLButtonClassName= "navButton";
        var asciiMathButtonClassName= "navButton";
        
        if(this.props.currentMathInput === ConstTypes.MathEquationInput.latex){
            latexButtonClassName += " selectedMathInput";
        }else if(this.props.currentMathInput === ConstTypes.MathEquationInput.mathML){
            mathMLButtonClassName += " selectedMathInput";
        }else if(this.props.currentMathInput === ConstTypes.MathEquationInput.asciiMath){
            asciiMathButtonClassName += " selectedMathInput";
        }

        const stylesLatex = {"maxWidth": "140px"};

        return (
            <div>
                <button className={latexButtonClassName} style={stylesLatex}
                        onClick={()=>{this.changeSelectedInput(ConstTypes.MathEquationInput.latex)}} ><img src={ConstsID.UrlImage + "latex.svg"} id="latexImage" alt="latex logo"/></button>
                <button className={mathMLButtonClassName} 
                        onClick={()=>{this.changeSelectedInput(ConstTypes.MathEquationInput.mathML)}}>MathML</button>
                <button className={asciiMathButtonClassName} 
                        onClick={()=>{this.changeSelectedInput(ConstTypes.MathEquationInput.asciiMath)}}>AsciiMath</button>
            </div>
        )
    }
}

export default SelectedMathType;