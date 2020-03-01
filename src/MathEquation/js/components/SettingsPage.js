import React from "react";
import * as ConstTypes from "../constants/constsTypes"
import * as Actions from '../actions/index'

import { connect } from 'react-redux';
import  store  from "../store/index"
import SettingsColor from "./SettingsColor"

@connect((store)=>{
    return{
        imageDimensionsSettings: store.localSync.imageDimensionsSettings
    }
})
class SettingsPage extends React.Component{
    constructor(props){
        super(props);
    }
    onChangeImageDimensionsSettings(event){
        var settings = event.target.value;
        store.dispatch(Actions.updateImageDimensionsSettings(settings));
    }


    render(){
        
        
        return (
            <div >
                <h2>Settings</h2>
                
                <h3>Image Dimensions</h3>
                <div id="settingsPageContainer">
                    <div>
                        <div>
                            <input type="radio"  value={ConstTypes.ImageDimensionsSettings.UserDefinedHeight} id={ConstTypes.ImageDimensionsSettings.UserDefinedHeight} 
                                name="imageDimensionsSettings" onChange={this.onChangeImageDimensionsSettings}
                                checked={this.props.imageDimensionsSettings === ConstTypes.ImageDimensionsSettings.UserDefinedHeight}
                                className="option-input radio"/>

                            <label for={ConstTypes.ImageDimensionsSettings.UserDefinedHeight}>fixed height</label>
                        </div>

                        <div>
                            <input type="radio"  value={ConstTypes.ImageDimensionsSettings.UserDefinedWidth}  id={ConstTypes.ImageDimensionsSettings.UserDefinedWidth}     
                                name="imageDimensionsSettings"     onChange={this.onChangeImageDimensionsSettings}
                                checked={this.props.imageDimensionsSettings === ConstTypes.ImageDimensionsSettings.UserDefinedWidth}
                                className="option-input radio"/>
                            
                            <label for={ConstTypes.ImageDimensionsSettings.UserDefinedWidth}>fixed width</label>

                        </div>
                        <div>
                            <input type="radio" value={ConstTypes.ImageDimensionsSettings.UserDefinedWidthAndHeight} id={ConstTypes.ImageDimensionsSettings.UserDefinedWidthAndHeight}
                                name="imageDimensionsSettings"  onChange={this.onChangeImageDimensionsSettings}
                                checked={this.props.imageDimensionsSettings === ConstTypes.ImageDimensionsSettings.UserDefinedWidthAndHeight}
                                className="option-input radio"/>
                            
                            <label for={ConstTypes.ImageDimensionsSettings.UserDefinedWidthAndHeight}>no fixed axes</label>
                        </div>
                       
                    </div>
                      
                    <div>
                        <p>This setting will allow you to fix one of the axes, so when you change the other the ratio of the image will be preserved.  
                           Fixing the width will allow you to change the height and automatically change the width to preserve the aspect ratio.  
                        </p>
                    </div>
                </div>
                <SettingsColor/>
            </div>
        )
    }
}

export default SettingsPage;