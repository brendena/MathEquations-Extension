import React from "react";
import { connect } from "react-redux";
import * as Actions from '../actions/index'
import  store  from "../store/index"
import SvgToCanvas from "../backendCode/SvgToCanvas"
import * as constID from '../constants/constsID'

@connect((store)=>{
    return{
        updateRenderCanvas: store.propsPage.updateRenderCanvas
    }
})
class SVGToCanvas extends React.Component{
    constructor(props){
        super(props);
    }
   
    updateCanvas()
    {
        var canvas = document.getElementById("canvasVisible");
        var svgContainer = document.getElementById(constID.MathEquationBox);
        var svg = svgContainer.getElementsByTagName("svg")[0];
        try{
            var drawingClass = new SvgToCanvas(svg,canvas,"#000000");
            store.dispatch(Actions.updateBase64MathImage(drawingClass.getPng64()));
        }
        catch(error)
        {
            console.log("error " + error)
        }
        
    }

    render(){
        if(this.props.updateRenderCanvas)
        {
            this.updateCanvas();
            store.dispatch(Actions.updateRenderCanvas(false));
        }
        return (
            <canvas id="canvasVisible"
                    height={this.props.canvasHeight} 
                    width={this.props.canvasWidth}></canvas>
        )
    }
}

export default SVGToCanvas;