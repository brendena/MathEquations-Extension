import React from "react";
import * as Actions from '../actions/index'
import * as ConstTypes from "../constants/constsTypes"
import * as ConstsID from "../constants/constsID"
import  store  from "../store/index"
import * as log from 'loglevel';

import LatexImage from "./LatexImage";


class SelectedMathType extends React.Component{
    constructor(props){
        super(props);
        this.latexButtonClassName = "";
    }

    changeSelectedInput(event,typeInput)
    {
        var parentsDiv = event.target.parentElement;
        //fix for the latex image button
        if(window.innerWidth < 800)
        {
            if(parentsDiv.className.length == 0)
            {
                parentsDiv.className = "selectedMathTypeScanShow";
            }
            else
            {
                parentsDiv.className = "";
            }
        }else
        {
            parentsDiv.className = "";
        }
        
        store.dispatch(Actions.changeSelectedMarkupLanguage(typeInput));
    }

    render()
    {
        

        this.latexButtonClassName= "navButton";
        var mathMLButtonClassName= "navButton";
        var asciiMathButtonClassName= "navButton";
        if(this.props.currentMathInput === ConstTypes.MarkupLanguages.latex){
            this.latexButtonClassName += " selectedMathInput";
        }else if(this.props.currentMathInput === ConstTypes.MarkupLanguages.mathML){
            mathMLButtonClassName += " selectedMathInput";
        }else if(this.props.currentMathInput === ConstTypes.MarkupLanguages.asciiMath){
            asciiMathButtonClassName += " selectedMathInput";
        }

        const stylesLatex = {"paddingTop": "20px", "height": "35px","paddingBottom": "15px","pointerEvents": "none" }//{"maxWidth": "140px"};

        return (
            <span id="selectMathTypeSpan">
                <button className={this.latexButtonClassName}
                        onClick={(event)=>{this.changeSelectedInput(event,ConstTypes.MarkupLanguages.latex)}} ><LatexImage/></button>
                <button className={mathMLButtonClassName} 
                        onClick={(event)=>{this.changeSelectedInput(event,ConstTypes.MarkupLanguages.mathML)}}>MathML</button>
                <button className={asciiMathButtonClassName} 
                        onClick={(event)=>{this.changeSelectedInput(event,ConstTypes.MarkupLanguages.asciiMath)}}>AsciiMath</button>
            </span>
        )
    }
}

export default SelectedMathType;