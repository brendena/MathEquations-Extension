import React from "react";
import { connect } from "react-redux";
import * as Actions from '../actions/index'
import  store  from "../store/index"
import SvgToCanvas from "../backendCode/SvgToCanvas"

@connect((store)=>{
    return{
        updateRenderCanvas: store.propsPage.updateRenderCanvas,
        textColor: store.propsPage.mathTextColor
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
        try{
            var drawingClass = new SvgToCanvas(svg,canvas,this.props.textColor);
            store.dispatch(Actions.updateBase64MathImage(drawingClass.getPng64()));
            store.dispatch(Actions.updateSVGMathImage(this.convertSvgToData(svg)));
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