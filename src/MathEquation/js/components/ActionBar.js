import React from "react";
import * as Actions from '../actions/index'
import * as ConstTypes from "../constants/constsTypes"
import * as ConstsID from "../constants/constsID"
import  store  from "../store/index"

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faWindowClose, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ActionBar extends React.Component{
    constructor(props){
        super(props);
        this.toggleMathEquationBoxShow = this.toggleMathEquationBoxShow.bind(this);
    }
    toggleMathEquationBoxShow(){
        store.dispatch(Actions.showMathEquationTextBox(!this.props.stateMathTextBox));
    }
    changeSelectedInput(typeInput){
        console.log("fired")
        console.log(typeInput)
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

        return (
            <div id="ActionBar">
                <img src={ConstsID.UrlImage + "logoClearBackground.svg"} id="navBarLogo" alt="Math Equations Logo"/>

                <button className={latexButtonClassName} 
                        onClick={()=>{this.changeSelectedInput(ConstTypes.MathEquationInput.latex)}} ><img src={ConstsID.UrlImage + "latex.svg"} id="latexImage" alt="latex logo"/></button>
                <button className={mathMLButtonClassName} 
                        onClick={()=>{this.changeSelectedInput(ConstTypes.MathEquationInput.mathML)}}>MathML</button>
                <button className={asciiMathButtonClassName} 
                        onClick={()=>{this.changeSelectedInput(ConstTypes.MathEquationInput.asciiMath)}}>AsciiMath</button>

                <div className="flexSpacer"></div>

                
                <button className="navButton" 
                        onClick={this.toggleMathEquationBoxShow}
                        style={stylesSlideMathTextBox}>
                    <FontAwesomeIcon icon={faChevronUp} />        
                </button>
                <a href="https://github.com/brendena/MathEquations-Extension">
                    <button className="navButton">
                        <FontAwesomeIcon icon={faGithub} />
                    </button>
                </a>
                <button className="navButton">
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div>
        )
    }
}

export default ActionBar;