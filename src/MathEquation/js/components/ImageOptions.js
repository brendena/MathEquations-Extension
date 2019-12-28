import React from "react";
import  store  from "../store/index"
import  * as ConstsTypes  from "../constants/constsTypes"
import * as Actions from '../actions/index'
import { connect } from 'react-redux';


import { faImage, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

@connect((store)=>{
    return{
        base64Image: store.propsPage.base64MathImage,
        sizeMathOutput: store.propsPage.sizeMathOutput
    }
})
class ImageOptions extends React.Component{
    constructor(props){
        super(props);
        document.addEventListener("cut", (event)=>{
            event.preventDefault();
            console.log("started copying 1");
            
            if (event.clipboardData) {
                if(this.pngBase64Image != ""){
                    console.log("setting the clipboard")
                    console.log(this.props.base64Image)
                    event.clipboardData.setData('text/html', '<meta http-equiv="content-type" content="text/html; charset=utf-8"><img id="CanvasImg" src="'+ this.props.base64Image +'">');
                }
            }
            else{
                throw("your browser does not support clipboardData.")
            }
        });
    }
    CopyImageToClipboard()
    {
        document.execCommand("cut");
        console.log("going to cut Button");
    }
    changeMathSizeImage(size)
    {
        console.log("teseting thiasdf asdfasdf")
        store.dispatch(Actions.updateSizeMathEquation(size));
    }



    render(){
        var styleSmallPicture  = {"fontSize":"10px"}
        var styleMediumPicture = {"fontSize":"20px"}
        var styleLargePicture  = {"fontSize":"30px"}

        if(this.props.sizeMathOutput == ConstsTypes.MathSizeSmall)
        {
            console.log("00000000000000000000")
            styleSmallPicture["borderColor"] = "black";
        }
        else if(this.props.sizeMathOutput == ConstsTypes.MathSizeMedium)
        {
            styleMediumPicture["borderColor"] = "black";
        }
        else if(this.props.sizeMathOutput == ConstsTypes.MathSizeLarge)
        {
            styleLargePicture["borderColor"] = "black";
        }
 
        return (
            <div id="imageOptions">
                <button className="buttonOptionsImage "
                        onClick={this.CopyImageToClipboard}>copy image</button>
                <input  className="removeStyles" type="color"/>
                
                <button className="buttonOptionsImage">
                    <FontAwesomeIcon icon={faDownload} />
                </button>
                
                <button className="buttonOptionsImage sizeImageStyles" 
                        onClick={()=>{this.changeMathSizeImage(ConstsTypes.MathSizeSmall);}}
                        style={styleSmallPicture}>
                    <FontAwesomeIcon icon={faImage} />
                </button>
                <button className="buttonOptionsImage sizeImageStyles"
                        onClick={()=>{this.changeMathSizeImage(ConstsTypes.MathSizeMedium);}} 
                        style={styleMediumPicture}>
                    <FontAwesomeIcon icon={faImage} />
                </button>
                <button className="buttonOptionsImage sizeImageStyles"
                        onClick={()=>{this.changeMathSizeImage(ConstsTypes.MathSizeLarge);}} 
                        style={styleLargePicture}>
                    <FontAwesomeIcon icon={faImage} />
                </button>
                
            </div>
        )
    }
}

export default ImageOptions;