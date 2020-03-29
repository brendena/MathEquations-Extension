import React from "react";
import PageSlider from "./PageSlider"
import ImageOptions from "./ImageOptions"
import MathEquationBox from "./MathEquationBox"
import  store  from "../store/index"
import * as Actions from '../actions/index'
import { connect } from 'react-redux';
import UILocationNamingScheme from '../backendCode/UILocationNamingScheme'
import * as constTypes from "../constants/constsTypes";

@connect((store)=>{
    return{
        height: store.propsPage.height,
        mathEquationText: store.propsPage.mathEquationText,
        showMathEquationBox: store.propsPage.showMathEquationTextBox,
        uiLocation: store.localSync.uiLocation
    }
})
class TextSlideBox extends React.Component{
    constructor(props){
        super(props);
    }
    updateMathEquationText(event){
        var inputEl = event.target.value.trim();
        store.dispatch(Actions.updateMathEquationText(inputEl));
    }
    render(){
        

        var position = {};
        
        if(this.props.uiLocation === constTypes.UILocation.Bottom)
        {
            position.height = this.props.height+"vh";
            
            if(!this.props.showMathEquationBox){

                position.transform = "translateY(" + (this.props.height + (75/ window.innerHeight * 100))  + "vh)";
                position.transition = "0.2s";
            }
            
        }
        else
        {
            position.width =  this.props.height+"vw";
            
            if(!this.props.showMathEquationBox){

                position.transform = "translateX(" + (this.props.height + (75/ window.innerWidth * 100))  + "vw)";
                position.transition = "0.2s";
            }
            
        }
        
        var textSlideBoxClass = UILocationNamingScheme("textSlideBox",this.props.uiLocation);
        var textSectionClass = UILocationNamingScheme("textSectionDividerClass",this.props.uiLocation);
        
        return (
            <div id="TextSlideBox" style={position} className={textSlideBoxClass}>
                <PageSlider uiLocation={this.props.uiLocation} />
                
                
                <div id="TextSectionDivider" class={textSectionClass}>
                    <textarea id="inputTextMathEquation" 
                              placeholder="equation location"
                              value={this.props.mathEquationText}
                              onChange={this.updateMathEquationText}>
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