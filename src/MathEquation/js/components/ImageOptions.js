import React from "react";
import  store  from "../store/index"
import * as Actions from '../actions/index'
import { connect } from 'react-redux';


import { faImage, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

@connect((store)=>{
    return{
        base64Image: store.propsPage.base64MathImage
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
    render(){
        const styleSmallPicture  = {"font-size":"10px"}
        const styleMediumPicture = {"font-size":"20px"}
        const styleLargePicture  = {"font-size":"30px"}
        return (
            <div id="imageOptions">
                <button className="buttonOptionsImage"
                        onClick={this.CopyImageToClipboard}>copy image</button>
                <input  className="removeStyles" type="color"/>
                
                <button className="icon-download-1 buttonOptionsImage">
                    <FontAwesomeIcon icon={faDownload} />
                </button>
                
                <button className="buttonOptionsImage" style={styleSmallPicture}>
                    <FontAwesomeIcon icon={faImage} />
                </button>
                <button className="buttonOptionsImage" style={styleMediumPicture}>
                    <FontAwesomeIcon icon={faImage} />
                </button>
                <button className="buttonOptionsImage" style={styleLargePicture}>
                    <FontAwesomeIcon icon={faImage} />
                </button>
                
            </div>
        )
    }
}

export default ImageOptions;