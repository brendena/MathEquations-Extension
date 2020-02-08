import React from "react";
import { connect } from "react-redux";
import * as Actions from '../actions/index'
import  store  from "../store/index"
import SvgToCanvas from "../backendCode/SvgToCanvas"
import  * as ConstTypes  from "../constants/constsTypes"

@connect((store)=>{
    return{
        updateRenderCanvas: store.propsPage.updateRenderCanvas,
        textColor: store.propsPage.mathTextColor,
        imageDimensionsSettings: store.localSync.imageDimensionsSettings,
        
    }
})
class SVGToCanvas extends React.Component{
    constructor(props){
        super(props);
        this.canvas = React.createRef();

        this.updateCanvas = this.updateCanvas.bind(this);
    }
    convertSvgToData(svgElement){
        let svgURL = new XMLSerializer().serializeToString(svgElement);
        return 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
    }
   
    updateCanvas()
    {
        var canvas = this.canvas.current;
        
        var svgContainer = this.props.locationSVG.current;
        var svg = svgContainer.getElementsByTagName("svg")[0];
        console.log(svg)
        try{
            var drawingClass = new SvgToCanvas(svg,canvas,this.props.textColor, this.props.imageDimensionsSettings);
            
            store.dispatch(Actions.updateBase64MathImage(drawingClass.getPng64()));
            store.dispatch(Actions.updateSVGMathImage(this.convertSvgToData(svg)));

            //don't need to update when the image dimentations are fixed.
            if(this.props.imageDimensionsSettings != ConstTypes.ImageDimensionsSettings.UserDefinedWidthAndHeight)
            {
                if(this.props.imageDimensionsSettings == ConstTypes.ImageDimensionsSettings.UserDefinedHeight)
                {
                    store.dispatch(Actions.updateWidthSizeMathEquation(drawingClass.canvas.width));
                }
                else if(this.props.imageDimensionsSettings == ConstTypes.ImageDimensionsSettings.UserDefinedWidth)
                {
                    store.dispatch(Actions.updateHeightSizeMathEquation(drawingClass.canvas.height));
                }


                
            }
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
                    ref={this.canvas}
                    height={this.props.canvasHeight} 
                    width={this.props.canvasWidth}></canvas>
        )
    }
}

export default SVGToCanvas;