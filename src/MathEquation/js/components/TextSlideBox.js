import React from "react";
import PageSlider from "./PageSlider"
import ImageOptions from "./ImageOptions"
import MathEquationBox from "./MathEquationBox"
import  store  from "../store/index"
import * as Actions from '../actions/index'
import { connect } from 'react-redux';

@connect((store)=>{
    return{
        mathInputString: store.propsPage.mathInputString
    }
})
class TextSlideBox extends React.Component{
    constructor(props){
        super(props);
    }
    updateLatexInput(){
        var inputEl = document.getElementById("inputTextMathEquation").value.trim();
        store.dispatch(Actions.changeSelectedMathInput(inputEl));
    }
    componentDidMount(){
        var inputEl = document.getElementById("inputTextMathEquation");
        
        inputEl.value = this.props.mathInputString;
    }
    render(){

        return (
            <div id="TextSlideBox">
                <PageSlider/>
                
                <div id="TextSectionDivider">
                    <textarea id="inputTextMathEquation" 
                              placeholder="equation location"
                              onKeyUp={this.updateLatexInput}>
                    </textarea>
                    <div id="textOutputBox">
                        <MathEquationBox/>
                        <ImageOptions/>
                    </div>
                    
                </div>

            </div>
        )
    }
}

export default TextSlideBox;