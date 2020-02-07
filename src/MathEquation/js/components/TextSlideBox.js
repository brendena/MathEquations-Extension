import React from "react";
import PageSlider from "./PageSlider"
import ImageOptions from "./ImageOptions"
import MathEquationBox from "./MathEquationBox"
import  store  from "../store/index"
import * as Actions from '../actions/index'
import { connect } from 'react-redux';

@connect((store)=>{
    return{
        pageHeight: store.propsPage.height,
        mathInputString: store.propsPage.mathInputString,
        showMathEquationBox: store.propsPage.showMathEquationTextBox
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
        var position = {height: this.props.pageHeight+"vh"}
        if(!this.props.showMathEquationBox){
            position.transform = "translateY(" + (this.props.pageHeight + (75/ window.innerHeight * 100))  + "vh)";
            position.transition = "0.2s";
        }
        
        return (
            <div id="TextSlideBox" style={position} className="textSlideBox_H">
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