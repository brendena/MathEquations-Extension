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
    }
})
class MathJaxComponent extends React.Component{
    constructor(props){
        super(props);
        this.changeLatexInput = this.changeLatexInput.bind(this);
    }

    changeLatexInput(inputEl, outputEl)
    {

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