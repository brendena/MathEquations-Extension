import React from "react";
import * as Actions from '../actions/index'
import  store  from "../store/index"
import * as ConstsID from "../constants/constsID"
import UILocationNamingScheme from '../backendCode/UILocationNamingScheme'
import * as constTypes from "../constants/constsTypes";

class PageSlider extends React.Component{
    constructor(props){
        super(props);
        this.handleMoveStart = this.handleMoveStart.bind(this);
        this.mousePosition = this.mousePosition.bind(this);
        this.handleMoveEnd = this.handleMoveEnd.bind(this);
    }
    mousePosition(event){
        //https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
                                                                            //this is the offset from the bottom nav bar
        
        var height = 0;
        if(this.props.uiLocation === constTypes.UILocation.Bottom)
        {
            height =  (100 - ((event.clientY / window.innerHeight) * 100)) - (75/ window.innerHeight * 100);
        }
        else if(this.props.uiLocation === constTypes.UILocation.Right)
        {
            height =  (100 - ((event.clientX / window.innerWidth) * 100)) - (75/ window.innerWidth * 100);
        }
        
        store.dispatch(Actions.changeHeightPage(height));
        
    }
    handleMoveStart(event){
        document.body.addEventListener("mousemove",this.mousePosition);
        document.addEventListener("mouseup", this.handleMoveEnd, {"once": true});
    }
    handleMoveEnd(){
        document.body.removeEventListener("mousemove",this.mousePosition,false);
    }
    handleDragEvents()
    {
        return false;
    }
    render(){

        var slideItemClass = UILocationNamingScheme("slideItem",this.props.uiLocation);

        var srcImageSlider = ConstsID.UrlImage + "resizeIcon_";
        if(this.props.uiLocation === constTypes.UILocation.Right)
        {
            srcImageSlider += "V.svg"
        }
        else
        {
            srcImageSlider += "H.svg"
        }

        return (
            <img id="slideItem" 
                  className={slideItemClass}
                  src={srcImageSlider}
                  draggable="false"
                  onMouseDown={this.handleMoveStart} alt="icon to increase size"/>
        )
    }
}

export default PageSlider;