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
        sizeMathOutput: store.propsPage.sizeMathOutput
    }
})
class ImageOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = 
        {
            "TextSize": this.props.sizeMathOutput
        };
        this.textInputChange = this.textInputChange.bind(this);


        document.addEventListener("cut", (event)=>{
            event.preventDefault();
            log.info("cut event triggered")
            
            
            if (event.clipboardData) {
                if(this.pngBase64Image != ""){
                    log.info("setting clipboard data")
                    console.log(event);
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
        store.dispatch(Actions.updateSizeMathEquation(size));
    }
    launchDownloadPage()
    {
        store.dispatch(Actions.updatePageUiType(ConstTypes.PopUpUi.DownloadImagePage))
        store.dispatch(Actions.updateDownloadImagePage(true));
    }
    textInputChange(event)
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
        store.dispatch(Actions.updateSizeMathEquation(newSizeImage));
    }


    render(){
        var styleSmallPicture  = {"fontSize":"10px"}
        var styleMediumPicture = {"fontSize":"20px"}
        var styleLargePicture  = {"fontSize":"30px"}

        if(this.props.sizeMathOutput == ConstTypes.MathSizeSmall)
        {
            styleSmallPicture["borderColor"] = "black";
        }
        else if(this.props.sizeMathOutput == ConstTypes.MathSizeMedium)
        {
            styleMediumPicture["borderColor"] = "black";
        }
        else if(this.props.sizeMathOutput == ConstTypes.MathSizeLarge)
        {
            styleLargePicture["borderColor"] = "black";
        }

        
 
        return (
            <div id="imageOptions">
                <button className="buttonOptionsImage "
                        onClick={this.CopyImageToClipboard}>copy image</button>
                <input  className="removeStyles" type="color"/>
                
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
                <input id="textInputSize" type="number" value={this.props.sizeMathOutput} onChange={this.textInputChange} />
                
            </div>
        )
    }
}

export default ImageOptions;