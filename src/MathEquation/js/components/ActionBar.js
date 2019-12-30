import React from "react";
import * as Actions from '../actions/index'
import * as ConstTypes from "../constants/constsTypes"
import * as ConstsID from "../constants/constsID"
import  store  from "../store/index"
import * as log from 'loglevel';

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faWindowClose, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ActionBar extends React.Component{
    constructor(props){
        super(props);
        this.toggleMathEquationBoxShow = this.toggleMathEquationBoxShow.bind(this);
        this.closeExtension = this.closeExtension.bind(this);
        this.closeButton = React.createRef();
    }
    toggleMathEquationBoxShow(){
        store.dispatch(Actions.showMathEquationTextBox(!this.props.stateMathTextBox));
    }
    changeSelectedInput(typeInput){
        store.dispatch(Actions.changeSelectedMathTypeInput(typeInput));
    }
    closeExtension(){
        log.info("event - closed extension")
        var event = new Event(ConstsID.CloseMathExtEventName, {"bubbles":true,"composed":true});
        this.closeButton.current.dispatchEvent(event);
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
                <button className="navButton" 
                        onClick={this.closeExtension}
                        ref={this.closeButton}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div>
        )
    }
}

export default ActionBar;