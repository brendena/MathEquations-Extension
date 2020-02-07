import React from "react";
import  store  from "../store/index"
import  * as ConstTypes  from "../constants/constsTypes"
import * as Actions from '../actions/index'
import { connect } from 'react-redux';
import * as log from 'loglevel';


import { faImage, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

@connect((store)=>{
    return{
        base64Image: store.propsPage.base64MathImage,
        widthMathOutput: store.propsPage.widthMathOutput,
        heightMathOutput: store.propsPage.heightMathOutput,
        imageDimensionsSettings: store.localSync.imageDimensionsSettings
    }
})
class ImageOptions extends React.Component{
    constructor(props){
        super(props);

        document.addEventListener("cut", (event)=>{
            event.preventDefault();
            log.info("cut event triggered")
            
            
            if (event.clipboardData) {
                if(this.pngBase64Image != ""){
                    log.info("setting clipboard data")
                    log.info(event)
                    //console.log(this.props.base64Image)
                    event.clipboardData.setData('text/html', '<meta http-equiv="content-type" content="text/html; charset=utf-8"><img id="CanvasImg" src="'+ this.props.base64Image +'">');
                    //event.clipboardData.setData('text', "testing this out");
                    
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
    }
    changeMathSizeImage(size)
    {
        store.dispatch(Actions.updateWidthSizeMathEquation(size));
    }
    launchDownloadPage()
    {
        store.dispatch(Actions.updatePageUiType(ConstTypes.PopUpUi.popUpUiPage))
    }
    changeWidthMathEquation(event)
    {
        const maxImageWidth = 10000;
        var newSizeImage = event.target.value;
        if(newSizeImage <= 0)
        {
            newSizeImage = 1;
        }
        //it start to really slow down your computer when you go higher then this number
        else if (newSizeImage >= maxImageWidth)
        {
            newSizeImage = maxImageWidth;
        }
        store.dispatch(Actions.updateWidthSizeMathEquation(newSizeImage));
    }
    changeHeightMathEquation(event)
    {
        const maxImageHeight = 10000;
        var newSizeImage = event.target.value;
        if(newSizeImage <= 0)
        {
            newSizeImage = 1;
        }
        //it start to really slow down your computer when you go higher then this number
        else if (newSizeImage >= maxImageHeight)
        {
            newSizeImage = maxImageHeight;
        }
        store.dispatch(Actions.updateHeightSizeMathEquation(newSizeImage));
    }


    
    textColorChanged(event)
    {
        store.dispatch(Actions.updateMathTextColor(event.target.value));
    }

    render(){
        var styleSmallPicture  = {"fontSize":"10px"}
        var styleMediumPicture = {"fontSize":"20px"}
        var styleLargePicture  = {"fontSize":"30px"}
        //var cssClassWidthInput = {};
        //var cssClassHeightInput= {};
        var heightInputDisabled = false;
        var widthInputDisabled = false;
        


        if(this.props.imageDimensionsSettings == ConstTypes.ImageDimensionsSettings.UserDefinedWidth)
        {
            //cssClassHeightInput = "inputDisabledLooking";
            heightInputDisabled = true;
        }
        else if(this.props.imageDimensionsSettings == ConstTypes.ImageDimensionsSettings.UserDefinedHeight)
        {
            //cssClassWidthInput = "inputDisabledLooking";
            widthInputDisabled = true;
        }


        if(this.props.widthMathOutput == ConstTypes.MathSizeSmall)
        {
            styleSmallPicture["borderColor"] = "black";
        }
        else if(this.props.widthMathOutput == ConstTypes.MathSizeMedium)
        {
            styleMediumPicture["borderColor"] = "black";
        }
        else if(this.props.widthMathOutput == ConstTypes.MathSizeLarge)
        {
            styleLargePicture["borderColor"] = "black";
        }

        var stylePixelSizeDescription  = {"paddingLeft":"5px","paddingRight":"5px"}
 
        return (
            <div id="imageOptions">
                <button className="buttonOptionsImage "
                        onClick={this.CopyImageToClipboard}>copy image</button>
                <input  className="removeStyles" type="color" onChange={this.textColorChanged}/>
                
                <button className="buttonOptionsImage"
                        onClick={this.launchDownloadPage}>
                    <FontAwesomeIcon icon={faDownload} />
                </button>
                
                <button className="buttonOptionsImage sizeImageStyles" 
                        onClick={()=>{this.changeMathSizeImage(ConstTypes.MathSizeSmall);}}
                        style={styleSmallPicture}>
                    <FontAwesomeIcon icon={faImage} />
                </button>
                <button className="buttonOptionsImage sizeImageStyles"
                        onClick={()=>{this.changeMathSizeImage(ConstTypes.MathSizeMedium);}} 
                        style={styleMediumPicture}>
                    <FontAwesomeIcon icon={faImage} />
                </button>
                <button className="buttonOptionsImage sizeImageStyles"
                        onClick={()=>{this.changeMathSizeImage(ConstTypes.MathSizeLarge);}} 
                        style={styleLargePicture}>
                    <FontAwesomeIcon icon={faImage} />
                </button>
                <input id="textInputSizeWidth" type="number" value={this.props.widthMathOutput} onChange={this.changeWidthMathEquation}  disabled={widthInputDisabled} />
                <span style={stylePixelSizeDescription}> width-px  </span>

                <input id="textInputSizeHeight" type="number" value={this.props.heightMathOutput} onChange={this.changeHeightMathEquation} disabled={heightInputDisabled} />
                <span style={stylePixelSizeDescription}> height-px  </span>
                
            </div>
        )
    }
}

export default ImageOptions;