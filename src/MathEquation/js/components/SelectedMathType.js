import React from "react";
import * as Actions from '../actions/index'
import * as ConstTypes from "../constants/constsTypes"
import * as ConstsID from "../constants/constsID"
import  store  from "../store/index"
import * as log from 'loglevel';




class SelectedMathType extends React.Component{
    constructor(props){
        super(props);
        this.latexButtonClassName = "";
    }

    changeSelectedInput(event,typeInput)
    {
        var parentsDiv = event.target.parentElement;
        if(window.innerWidth < 800)
        {
            console.log(parentsDiv.nodeName);
            if(event.target.parentElement.className.length == 0)
            {
                event.target.parentElement.className = "selectedMathTypeScanShow";
            }
            else
            {
                event.target.parentElement.className = "";
            }
        }else
        {
            event.target.parentElement.className = "";
        }
        
        store.dispatch(Actions.changeSelectedMathTypeInput(typeInput));
    }

    render(){

        this.latexButtonClassName= "navButton";
        var mathMLButtonClassName= "navButton";
        var asciiMathButtonClassName= "navButton";
        if(this.props.currentMathInput === ConstTypes.MathEquationInput.latex){
            this.latexButtonClassName += " selectedMathInput";
        }else if(this.props.currentMathInput === ConstTypes.MathEquationInput.mathML){
            mathMLButtonClassName += " selectedMathInput";
        }else if(this.props.currentMathInput === ConstTypes.MathEquationInput.asciiMath){
            asciiMathButtonClassName += " selectedMathInput";
        }

        const stylesLatex = {"paddingTop": "20px", "height": "35px","paddingBottom": "15px","pointerEvents": "none" }//{"maxWidth": "140px"};

        return (
            <span id="selectMathTypeSpan">
                <button className={this.latexButtonClassName}
                        onClick={(event)=>{this.changeSelectedInput(event,ConstTypes.MathEquationInput.latex)}} ><img   style={stylesLatex} src={ConstsID.UrlImage + "latex.svg"} id="latexImage" alt="latex logo"/></button>
                <button className={mathMLButtonClassName} 
                        onClick={(event)=>{this.changeSelectedInput(event,ConstTypes.MathEquationInput.mathML)}}>MathML</button>
                <button className={asciiMathButtonClassName} 
                        onClick={(event)=>{this.changeSelectedInput(event,ConstTypes.MathEquationInput.asciiMath)}}>AsciiMath</button>
            </span>
        )
    }
}

export default SelectedMathType;