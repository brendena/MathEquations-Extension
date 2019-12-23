import React from "react";
import PageSlider from "./PageSlider"
import ImageOptions from "./ImageOptions"
import MathEquationBox from "./MathEquationBox"
import  store  from "../store/index"
import * as Actions from '../actions/index'

class TextSlideBox extends React.Component{
    constructor(props){
        super(props);
    }
    updateLatexInput(){
        var inputEl = document.getElementById("inputTextMathEquation").value.trim();
        store.dispatch(Actions.changeSelectedMathInput(inputEl));
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