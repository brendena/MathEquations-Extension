import React from "react";
import * as Actions from '../actions/index'
import * as ConstTypes from "../constants/constsTypes"
import * as ConstsID from "../constants/constsID"
import  store  from "../store/index"
import * as log from 'loglevel';
import SelectedMathType from "./SelectedMathType.js"

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faWindowClose, faChevronUp, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class ActionBar extends React.Component{
    constructor(props){
        super(props);
        this.toggleMathEquationBoxShow = this.toggleMathEquationBoxShow.bind(this);
        this.closeExtension = this.closeExtension.bind(this);
        this.closeButton = React.createRef();
    }
    toggleMathEquationBoxShow(){
        store.dispatch(Actions.showMathEquationTextBox(!this.props.stateMathTextBox));
    }
    closeExtension(){
        log.info("event - closed extension")
        var event = new Event(ConstsID.CloseMathExtEventName, {"bubbles":true,"composed":true});
        this.closeButton.current.dispatchEvent(event);
    }

    launchDownloadPage()
    {
        store.dispatch(Actions.updatePageUiType(ConstTypes.PopUpUi.DonatePage))
        store.dispatch(Actions.updatePopUiPage(ConstTypes.TrueFalseToggle.toggle));
    }


    render(){
        var stylesSlideMathTextBox = { transform: "rotate(0deg)"}
        if(this.props.stateMathTextBox)
        {
            stylesSlideMathTextBox.transform = "rotate(180deg)"
        }



        return (
            <div id="ActionBar">
                <img src={ConstsID.UrlImage + "logoClearBackground.svg"} id="navBarLogo" alt="Math Equations Logo"/>

                <SelectedMathType currentMathInput={this.props.currentMathInput}/>
             
                <div className="flexSpacer"></div>

                
                <button className="navButton" 
                        onClick={this.toggleMathEquationBoxShow}
                        style={stylesSlideMathTextBox}>
                    <FontAwesomeIcon icon={faChevronUp} />        
                </button>
                <button className="navButton" 
                        onClick={this.launchDownloadPage}>
                    <FontAwesomeIcon icon={faCoins} />        
                </button>
                <a href="https://github.com/brendena/MathEquations-Extension">
                    <button className="navButton">
                        <FontAwesomeIcon icon={faGithub} />
                    </button>
                </a>
                <button className="navButton" 
                        onClick={this.closeExtension}
                        ref={this.closeButton}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div>
        )
    }
}

export default ActionBar;