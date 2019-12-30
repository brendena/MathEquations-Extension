import React from "react";
import { connect } from "react-redux";
import * as Actions from '../actions/index'
import { faDownload,faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constTypes from "../constants/constsTypes"
import  store  from "../store/index"


@connect((store)=>{
    return{
        mathDownloadType: store.propsPage.downloadImageType,
        pageOpen: store.propsPage.downloadImagePage,
        base64MathImage : store.propsPage.base64MathImage,
        svgMathImage : store.propsPage.svgMathImage
    }
})
class DownloadImagePopUp extends React.Component{
    constructor(props){
        super(props);
        this.state = 
        {
            "fileName": ""
        };
        this.updateFileName = this.updateFileName.bind(this);
    }

    updateDownloadImageType(imageType)
    {
        store.dispatch(Actions.updateDownloadImageType(imageType));
        
    }

    updateFileName(event)
    {
        this.setState({fileName: event.target.value});
    }

    closeDownloadPage()
    {
        store.dispatch(Actions.updateDownloadImagePage(false));
    }

    render(){
        var fileName = this.state.fileName;
        var styleSVG = {};
        var stylePNG = {};
        var hrefData = "";
        if(this.props.mathDownloadType === constTypes.ImageDownloadType.svg)
        {
            fileName += ".svg";
            styleSVG["backgroundColor"] = "#cae4ff8f"
            styleSVG["borderColor"] = "black";
            console.log(this.props.svgMathImage)
            hrefData = this.props.svgMathImage;
        }
        else if(this.props.mathDownloadType === constTypes.ImageDownloadType.png)
        {
            fileName += ".png";
            stylePNG["backgroundColor"] = "#cae4ff8f"
            stylePNG["borderColor"] = "black";
            hrefData = this.props.base64MathImage;
        }

        var styleToClose = {};
        if(this.props.pageOpen == false)
        {
            styleToClose["bottom"] = "-100%";
        }



        return (
            <div id="DownloadImagePopUpCenter" style={styleToClose}>
                <div id="DownloadImagePopUp" >
                    <div id="ExitDownloadPage" 
                        onClick={this.closeDownloadPage}>
                        <FontAwesomeIcon icon={faWindowClose} />
                    </div>
                    <div id="DownloadForm">
                        <input placeholder="fileName" pattern="[a-zA-Z0-9-]+" 
                            value={this.state.fileName} 
                            onChange={this.updateFileName}></input>
                        <button className="buttonOptionsImage sizeImageStyles" 
                                onClick={()=>{this.updateDownloadImageType(constTypes.ImageDownloadType.svg)}}
                                style={styleSVG}>
                                .svg
                        </button>  
                        <button className="buttonOptionsImage sizeImageStyles" 
                                onClick={()=>{this.updateDownloadImageType(constTypes.ImageDownloadType.png)}}
                                style={stylePNG}>
                                .png
                        </button>  

                        <a id="DownloadButton" download={fileName} href={hrefData}>
                            <FontAwesomeIcon icon={faDownload} />
                            download image
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default DownloadImagePopUp;