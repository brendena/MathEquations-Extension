import React from "react";
import * as ConstTypes from "../constants/constsTypes"
import * as Actions from '../actions/index'

import { connect } from 'react-redux';
import  store  from "../store/index"
import ThemeColors from "../types/ThemeColors"


class SettingsColor extends React.Component{
    constructor(props){
        super(props);
    }

    changeColors(themeName){
        var theme = new ThemeColors();
        
        //if(default don't change anything)

        if(themeName == "darkTheme")
        {
            theme.mainColor = "purple";
            theme.textBackground = "grey";
            theme.fontColor = "#00a2ff";
        }
        
        store.dispatch(Actions.updateColorThemes(theme)); 
    }

    render(){
        
        
        return (
            <div >
                <h3>Color Themes</h3>

                <button onClick={()=>{this.changeColors("default")}}>color set 1</button>
                <button onClick={()=>{this.changeColors("darkTheme")}}>color set 2</button>

            </div>
        )
    }
}

export default SettingsColor;