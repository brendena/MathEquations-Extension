import React from "react";
import { connect } from "react-redux";
import * as Actions from '../actions/index'
import { faDownload,faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constTypes from "../constants/constsTypes"
import  store  from "../store/index"
import DownloadForm from "./DownloadForm"
import DonatePage from "./DonatePage"

@connect((store)=>{
    return{
        pageOpen: store.propsPage.downloadImagePage,
        popUiType: store.propsPage.popUiType
    }
})
class PopUpUi extends React.Component{
    constructor(props){
        super(props);
    }
    
    closePopUpPage()
    {
        store.dispatch(Actions.updateDownloadImagePage(false));
    }

    render(){

        var styleToClose = {};
        if(this.props.pageOpen == false)
        {
            styleToClose["bottom"] = "-100%";
        }
        console.log(this.popUiType)
        return (
            <div id="DownloadImagePopUpCenter" style={styleToClose}>
                <div id="DownloadImagePopUp" >
                    <div id="ExitDownloadPage" 
                        onClick={this.closePopUpPage}>
                        <FontAwesomeIcon icon={faWindowClose} />
                    </div>

                    {this.props.popUiType == constTypes.PopUpUi.DownloadImagePage ? (<DownloadForm />) : (<div></div>)  }
                    {this.props.popUiType == constTypes.PopUpUi.DonatePage ? (<DonatePage />) : (<div></div>)  }

                </div>
            </div>
        )
    }
}

export default PopUpUi;