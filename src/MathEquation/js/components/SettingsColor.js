import React from "react";
import * as ConstTypes from "../constants/constsTypes"
import * as Actions from '../actions/index'
import * as log from 'loglevel';
import { connect } from 'react-redux';
import  store  from "../store/index"
import ThemeColors from "../types/ThemeColors"


class SettingsColor extends React.Component{
    constructor(props){
        super(props);
        this.changeColors = this.changeColors.bind(this);

        this.defaultTheme = new ThemeColors();
        this.darkTheme = new ThemeColors();
        this.vimTheme = new ThemeColors();
        this.sunriseTheme = new ThemeColors();





        this.darkTheme.mainColor = "#65939e";
        this.darkTheme.textBackground = "#2e343f";
        this.darkTheme.fontColor = "white";

        this.vimTheme.mainColor = "#191919";
        this.vimTheme.textBackground = "#191919";
        this.vimTheme.fontColor = "#6ac921";

        this.sunriseTheme.mainColor = "#a480c4";
        this.sunriseTheme.textBackground = "#fdf6e2";
        this.sunriseTheme.fontColor = "#346192";
    }

    changeColors(themeName){
        var theme = new ThemeColors();
        
        log.info("changed theme");

        //if(default don't change anything)
        if(themeName == "darkTheme")
        {
            theme = this.darkTheme;
        }
        else if(themeName == "vimTheme")
        {
            theme = this.vimTheme;
        }
        else if(themeName == "sunriseTheme")
        {
            theme = this.sunriseTheme;
        }
        
        store.dispatch(Actions.updateColorThemes(theme)); 
    }

    createThemeStyles(theme){
        return {
            "borderColor": theme.textBackground,
            "borderLeftColor": theme.mainColor,
            "borderTopColor": theme.mainColor
        }
    }

    render(){
        var defaultThemeStyle = this.createThemeStyles(this.defaultTheme);
        var darkThemeStyle = this.createThemeStyles(this.darkTheme);
        var vimThemeStyle = this.createThemeStyles(this.vimTheme);
        vimThemeStyle.borderTopColor = this.vimTheme.fontColor;
        vimThemeStyle.borderLeftColor = this.vimTheme.fontColor;
        var sunriseThemeStyle = this.createThemeStyles(this.sunriseTheme);

        return (
            <div >
                <h3>Color Themes</h3>

                <button style={defaultThemeStyle} className="themeColorIcon" 
                     onClick={()=>{this.changeColors("default")}}></button>

                <div style={darkThemeStyle} className="themeColorIcon"
                     onClick={()=>{this.changeColors("darkTheme")}}></div>

                <div style={vimThemeStyle} className="themeColorIcon"
                     onClick={()=>{this.changeColors("vimTheme")}}></div>

                <div style={sunriseThemeStyle} className="themeColorIcon"
                     onClick={()=>{this.changeColors("sunriseTheme")}}></div>



            </div>
        )
    }
}

export default SettingsColor;