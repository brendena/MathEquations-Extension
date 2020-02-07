import React from "react";
import * as ConstTypes from "../constants/constsTypes"
import * as Actions from '../actions/index'

import { connect } from 'react-redux';
import  store  from "../store/index"


@connect((store)=>{
    return{
        imageDimensionsSettings: store.localSync.imageDimensionsSettings
    }
})
class SettingsPage extends React.Component{
    constructor(props){
        super(props);
        this.containerForInput = React.createRef();
    }
    onChangeImageDimensionsSettings(event){
        var settings = event.target.value;
        console.log(settings)
        store.dispatch(Actions.updateImageDimensionsSettings(settings));
    }

    componentDidMount(){
        console.log("did mount");
        //when this happens the ui isen't loaded up
        //console.log(this.containerForInput);
        //can't easily just search for a div
        console.log(this)

    }


    render(){
        
        
        return (
            <div ref={this.containerForInput}>
                <p>Settings</p>
                
                <input type="radio"  value={ConstTypes.ImageDimensionsSettings.UserDefinedHeight} id={ConstTypes.ImageDimensionsSettings.UserDefinedHeight} 
                       name="imageDimensionsSettings" onChange={this.onChangeImageDimensionsSettings}/>

                <label for="UserDefinedWidth">user defined height</label>
                <input type="radio"  value={ConstTypes.ImageDimensionsSettings.UserDefinedWidth}  id={ConstTypes.ImageDimensionsSettings.UserDefinedWidth}     
                       name="imageDimensionsSettings"     onChange={this.onChangeImageDimensionsSettings}/>
                
                <label for="UserDefinedHeight">user defined width</label>
                <input type="radio" value={ConstTypes.ImageDimensionsSettings.UserDefinedHeightAndHeight} id={ConstTypes.ImageDimensionsSettings.UserDefinedHeightAndHeight}
                       name="imageDimensionsSettings"  onChange={this.onChangeImageDimensionsSettings}/>
                
                <label for="UserDefinedHeightAndHeight">user defined width and height</label>
            </div>
        )
    }
}

export default SettingsPage;