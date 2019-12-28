import React from "react";
import  store  from "../store/index"
import * as Actions from '../actions/index'
import { connect } from 'react-redux';
import * as constID from '../constants/constsID'


@connect((store)=>{
    return{
        mathInputString: store.propsPage.mathInputString
    }
})
class MathEquationBox extends React.Component{
    constructor(props){
        super(props);
    }

    changeLatexInput(inputEl, outputEl)
    {
        const MathJax = window.MathJax;
        
        
        
        outputEl.innerHTML = '';

        MathJax.texReset();
        var options = MathJax.getMetricsFor(outputEl);
        
        MathJax.tex2svgPromise(inputEl, options).then(function (node) {
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
    componentDidMount(){
        var outputEl = document.getElementById(constID.MathEquationBox);
        this.changeLatexInput(this.props.mathInputString,outputEl);
    }
    render(){
        var outputEl = document.getElementById(constID.MathEquationBox);

        if(this.props.mathInputString != "" && outputEl != null)
        {
            this.changeLatexInput(this.props.mathInputString,outputEl);
        }
        return (
            <div id={constID.MathEquationBox}></div>
        )
    }
}

export default MathEquationBox;