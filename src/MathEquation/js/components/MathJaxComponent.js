import React from "react";
import  store  from "../store/index"
import * as Actions from '../actions/index'
import { connect } from 'react-redux';
import * as constID from '../constants/constsID'
import * as constTypes from "../constants/constsTypes"
import SVGToCanvas from "./SVGToCanvas"

@connect((store)=>{
    return{
        mathEquationText: store.propsPage.mathEquationText,
        selectedMarkupLanguage: store.propsPage.selectedMarkupLanguage,
        textColor: store.propsPage.mathTextColor,
        widthMathOutput: store.propsPage.widthMathOutput,
        heightMathOutput: store.propsPage.heightMathOutput,    
        imageDimensionsSettings: store.localSync.imageDimensionsSettings
    }
})
class MathJaxComponent extends React.Component{
    constructor(props){
        super(props);
        this.changeLatexInput = this.changeLatexInput.bind(this);
        this.copyProps = this.copyProps.bind(this);
        this.cProps = {};
        this.copyProps();
    }

    copyProps(){
        this.cProps = this.props;
    }

    changeLatexInput(inputEl, outputEl)
    {
        //There was some circler logic that was causing multiple drawing of the svg.
        //Reason - There's modes where the canvas changes the height or the width
        //         Because of this, this module gets updated a lot recalling this funciton.
        //         To fix this i have checks to determine if it should really be redrawn.
        var imageAlreadyDrawn = 
            (this.props.mathEquationText == this.cProps.mathEquationText) &&
            (this.props.selectedMarkupLanguage == this.cProps.selectedMarkupLanguage) &&
            (this.props.textColor == this.cProps.textColor);

            
        if(this.props.imageDimensionsSettings == constTypes.ImageDimensionsSettings.UserDefinedWidth)
        {
            imageAlreadyDrawn &= (this.cProps.widthMathOutput == this.props.widthMathOutput);
        }
        else if(this.props.imageDimensionsSettings == constTypes.ImageDimensionsSettings.UserDefinedHeight)
        {
            imageAlreadyDrawn &= (this.cProps.heightMathOutput == this.props.heightMathOutput);
        }

        if(!imageAlreadyDrawn)
        {
            this.copyProps();
            const MathJax = window.MathJax;

            outputEl.innerHTML = '';
    
            MathJax.texReset();
    
            var equationToSvgPromise;
            if(this.props.selectedMarkupLanguage === constTypes.MarkupLanguages.latex)
            {
                equationToSvgPromise = MathJax.tex2svgPromise;
            }
            else if(this.props.selectedMarkupLanguage === constTypes.MarkupLanguages.mathML)
            {
                equationToSvgPromise = MathJax.mathml2svgPromise;
            }
            else if(this.props.selectedMarkupLanguage === constTypes.MarkupLanguages.asciiMath)
            {
                equationToSvgPromise = MathJax.asciimath2svgPromise;
            }
    
            var options = MathJax.getMetricsFor(outputEl);
    
                equationToSvgPromise(inputEl, options).then(function (node) {
                    //
                    //  The promise returns the typeset node, which we add to the output
                    //  Then update the document to include the adjusted CSS for the
                    //    content of the new equation.
                    //
                    outputEl.appendChild(node);
                    MathJax.startup.document.clear();
                    MathJax.startup.document.updateDocument();
                    store.dispatch(Actions.updateRenderCanvas(true));
    
                }).catch(function (err) {
                    //
                    //  If there was an error, put the message into the output instead
                    //
                    console.log("error");
                    console.log(err.message)
                    var preElement = document.createElement('pre');
                    preElement.style.fontSize = "15px";
                    outputEl.appendChild(preElement).appendChild(document.createTextNode(err.message));
                    store.dispatch(Actions.updateRenderCanvas(true));
                })
        }
    }
    changeLatex(){
        if(this.props.mathEquationText != "" && this.props.renderDiv.current != null)
        {
            this.changeLatexInput(this.props.mathEquationText,this.props.renderDiv.current);
        }
    }
    componentDidMount(){
        this.changeLatex();
    }

    render(){
        this.changeLatex();

        return (
            <div >
            </div>
        )
    }
}

export default MathJaxComponent;