import React from "react";
import  store  from "../store/index"
import * as Actions from '../actions/index'
import { connect } from 'react-redux';
import * as constID from '../constants/constsID'
import * as constTypes from "../constants/constsTypes"
import SVGToCanvas from "./SVGToCanvas"

@connect((store)=>{
    return{
        mathInputString: store.propsPage.mathInputString,
        typeMathInput: store.propsPage.typeMathInput,
        sizeMathOutput: store.propsPage.sizeMathOutput

    }
})
class MathEquationBox extends React.Component{
    constructor(props){
        super(props);
        this.outputRef = React.createRef();
        this.MathJax;
        this.changeLatexInput = this.changeLatexInput.bind(this);
    }

    changeLatexInput(inputEl, outputEl)
    {

        const MathJax = window.MathJax;

        outputEl.innerHTML = '';

        
        
        MathJax.texReset();

        var equationToSvgPromise;
        if(this.props.typeMathInput === constTypes.MathEquationInput.latex)
        {
            equationToSvgPromise = MathJax.tex2svgPromise;
        }
        else if(this.props.typeMathInput === constTypes.MathEquationInput.mathML)
        {
            equationToSvgPromise = MathJax.mathml2svgPromise;
        }
        else if(this.props.typeMathInput === constTypes.MathEquationInput.asciiMath)
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
                outputEl.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
                store.dispatch(Actions.updateRenderCanvas(true));
            })

    }
    changeLatex(){
        if(this.props.mathInputString != "" && this.outputRef.current != null)
        {
            this.changeLatexInput(this.props.mathInputString,this.outputRef.current);
        }
    }

    componentDidMount(){
        this.changeLatex();
    }
    render(){
        this.changeLatex();
        return (
            <div id={constID.MathEquationBox}>
                <div  ref={this.outputRef}>
                
                </div>
                <SVGToCanvas    
                                locationSVG={this.outputRef}
                                canvasHeight={this.props.sizeMathOutput} 
                                canvasWidth={this.props.sizeMathOutput}>
                </SVGToCanvas>
            </div>



        )
    }
}

export default MathEquationBox;