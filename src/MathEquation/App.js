import React from 'react';
import './App.css';
import './Buttons.css';
import  store  from "./js/store/index"

import { connect } from 'react-redux';
import  ActionBar  from "./js/components/ActionBar"
import TextSlideBox from "./js/components/TextSlideBox"
import PopUpUi from "./js/components/PopUpUi"

import * as ConstsID from "./js/constants/constsID"

@connect((store)=>{
  return{
    showMathEquationBox: store.propsPage.showMathEquationTextBox,
    selectedMarkupLanguage: store.propsPage.selectedMarkupLanguage,
    themeColor: store.localSync.themeColors
  }
})
class App extends React.Component{
  constructor(props){
    super(props);
    var browser = browser || chrome;
    browser.storage.local.get(function(data){
        var componentsTag = document.getElementsByTagName("math-equations");
        var tag = componentsTag[0];
        tag.style.setProperty("--mainColor",data.themeColors.mainColor);
        tag.style.setProperty("--textBackground",data.themeColors.textBackground);
        tag.style.setProperty("--fontColor",data.themeColors.fontColor);
    });
  }
  
  updateTheme()
  {
    var componentsTag = document.getElementsByTagName("math-equations");
    if(componentsTag.length == 1)
    {
      
      var tag = componentsTag[0];
      console.log(tag)
      tag.style.setProperty("--mainColor",this.props.themeColor.mainColor);
      tag.style.setProperty("--textBackground",this.props.themeColor.textBackground);
      tag.style.setProperty("--fontColor",this.props.themeColor.fontColor);
    }
  }

  render (){
    this.updateTheme();
    return(
      


     <div className="App appGrid_H">
          <div id="appSpacer" className="appSpacer_H"></div>
          <TextSlideBox/>
          <ActionBar stateMathTextBox={this.props.showMathEquationBox} 
                     currentMathInput={this.props.selectedMarkupLanguage}/>
          <PopUpUi/>
    </div>)
  };
}

export default App;
