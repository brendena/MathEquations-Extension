import React from 'react';
import './App.css';
import './Buttons.css';
import  store  from "./js/store/index"

import { connect } from 'react-redux';
import  ActionBar  from "./js/components/ActionBar"
import TextSlideBox from "./js/components/TextSlideBox"
import PopUpUi from "./js/components/PopUpUi"
import * as log from 'loglevel';
import * as Actions from './js/actions/index'
import UILocationNamingScheme from './js/backendCode/UILocationNamingScheme'



@connect((store)=>{
  return{
    showMathEquationBox: store.propsPage.showMathEquationTextBox,
    selectedMarkupLanguage: store.propsPage.selectedMarkupLanguage,
    themeColor: store.localSync.themeColors,
    uiLocation: store.localSync.uiLocation
  }
})
class App extends React.Component{
  constructor(props){
    super(props);
    /*
    var browser = browser || chrome;
    browser.storage.local.get(function(data){
      if(Object.keys(data).length != 0)
      {
        store.dispatch(Actions.updateAllLocalSyncOptions(data));
      }
      
    });
    this.updateTheme = this.updateTheme.bind(this);
    */
  }
  
  updateTheme()
  {
    var componentsTag = document.getElementsByTagName("math-equations");
    if(componentsTag.length == 1)
    {
      
      var tag = componentsTag[0];
      tag.style.setProperty("--mainColor",this.props.themeColor.mainColor);
      tag.style.setProperty("--textBackground",this.props.themeColor.textBackground);
      tag.style.setProperty("--fontColor",this.props.themeColor.fontColor);
    }
  }

  render (){
    this.updateTheme();
    var appContainerClass = UILocationNamingScheme("App appGrid",this.props.uiLocation);
    var appSpacer = UILocationNamingScheme("appSpacer",this.props.uiLocation); 
    console.log(appContainerClass);
    return(
     <div className={appContainerClass}>
          <div id="appSpacer" className={appSpacer}></div>
          <TextSlideBox/>
          <ActionBar stateMathTextBox={this.props.showMathEquationBox} 
                     currentMathInput={this.props.selectedMarkupLanguage}
                     uiLocation={this.props.uiLocation}/>
          <PopUpUi/>
    </div>)
  };
}

export default App;
