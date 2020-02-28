import React from "react";
import { connect } from "react-redux";
import * as Actions from '../actions/index'
import { faDownload,faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as constTypes from "../constants/constsTypes"
import  store  from "../store/index"
import DownloadForm from "./DownloadForm"
import DonatePage from "./DonatePage"
import SettingsPage from "./SettingsPage"

@connect((store)=>{
    return{
        pageOpen: store.propsPage.popUpUiPage,
        popUiType: store.propsPage.popUiType
    }
})
class PopUpUi extends React.Component{
    constructor(props){
        super(props);
    }
    
    closePopUpPage()
    {
        store.dispatch(Actions.updatePopUiPage(false));
    }

    render(){

        var styleToClose = {};
        if(this.props.pageOpen == false)
        {
            styleToClose.transform = "translateY(100vh)";
        }
        return (
            <div id="PopUpUiContainer" style={styleToClose}>
                <div id="InnerPopUpUiContainer" >
                    <div id="ExitPopUpUi" 
                        onClick={this.closePopUpPage}>
                        <FontAwesomeIcon icon={faWindowClose} />
                    </div>

                    {this.props.popUiType == constTypes.PopUpUi.popUpUiPage ? (<DownloadForm />) : (<div></div>)  }
                    {this.props.popUiType == constTypes.PopUpUi.DonatePage ? (<DonatePage />) : (<div></div>)  }
                    {this.props.popUiType == constTypes.PopUpUi.SettingsPage ? (<SettingsPage />) : (<div></div>)  }

                </div>
            </div>
        )
    }
}

export default PopUpUi;