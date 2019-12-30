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
        this.state = {"localMathInputString": this.props.mathInputString};
        this.updateLatexInput = this.updateLatexInput.bind(this);
    }
    updateLatexInput(event){
        this.state.localMathInputString = event.target.value;
        var inputEl = event.target.value.trim();
        store.dispatch(Actions.changeSelectedMathInput(inputEl));
    }
    render(){
        //onKeyUp={this.updateLatexInput}
        return (
            <div id="TextSlideBox">
                <PageSlider/>
                
                <div id="TextSectionDivider">
                    <textarea id="inputTextMathEquation" 
                              placeholder="equation location"
                              value={this.state.localMathInputString}
                              onChange={this.updateLatexInput}>
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