import React from "react";
import { connect } from 'react-redux';
import * as constID from '../constants/constsID'
import SVGToCanvas from "./SVGToCanvas"
import MathJaxComponent from "./MathJaxComponent"

@connect((store)=>{
    return{
        mathEquationText: store.propsPage.mathEquationText,
        base64MathImage: store.propsPage.base64MathImage,
        widthMathOutput: store.propsPage.widthMathOutput,
        heightMathOutput: store.propsPage.heightMathOutput,
    }
})
class MathEquationBox extends React.Component{
    constructor(props){
        super(props);
        this.outputRef = React.createRef();

        this.dragImage = this.dragImage.bind(this);
    }

    dragImage(event)
    {
        console.log("got a drag event")
        console.log(event)

        var testImage = document.createElement("img"); 
        testImage.src = this.props.base64MathImage;




        var wrapper = document.createElement("div");
        wrapper.appendChild(testImage);
        event.dataTransfer.setData("text/html",wrapper.innerHTML);

        //event.dataTransfer.setDragImage(testImage,10,10);
    }
    render(){

        //make the text change color with the input
        //"color":this.props.textColor,
        var colorMathEquation  = {"fontSize":"30px","margin":0}

        return (
            <div id={constID.MathEquationBox}>
                <MathJaxComponent renderDiv={this.outputRef}></MathJaxComponent>


                <div draggable="true" onDragStart={this.dragImage} style={colorMathEquation} ref={this.outputRef}>
                
                </div>
                <SVGToCanvas    
                                locationSVG={this.outputRef}
                                canvasHeight={this.props.heightMathOutput} 
                                canvasWidth={this.props.widthMathOutput}>
                </SVGToCanvas>
            </div>



        )
    }
}

export default MathEquationBox;