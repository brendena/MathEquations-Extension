import React from "react";
import * as Actions from '../actions/index'
import  store  from "../store/index"
import * as ConstsID from "../constants/constsID"

class PageSlider extends React.Component{
    constructor(props){
        super(props);
        this.handleMoveStart = this.handleMoveStart.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.handleMoveEnd = this.handleMoveEnd.bind(this);
    }
    changeHeight(event){
        //https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
                                                                            //this is the offset from the bottom nav bar
        var height =  (100 - ((event.clientY / window.innerHeight) * 100)) - (75/ window.innerHeight * 100);
        store.dispatch(Actions.changeHeightPage(height));
        
    }
    handleMoveStart(event){
        document.body.addEventListener("mousemove",this.changeHeight);
        document.addEventListener("mouseup", this.handleMoveEnd, {"once": true});
    }
    handleMoveEnd(){
        document.body.removeEventListener("mousemove",this.changeHeight,false);
    }
    handleDragEvents()
    {
        return false;
    }
    render(){
        return (
            <img id="slideItem" 
                  src={ConstsID.UrlImage + "resizeIcon.svg"}
                  draggable="false"
                  onMouseDown={this.handleMoveStart} alt="icon to increase size"/>
        )
    }
}

export default PageSlider;