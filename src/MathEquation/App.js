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
    typeMathInput: store.propsPage.typeMathInput
  }
})
class App extends React.Component{
  constructor(props){
    super(props);
  }
  

  render (){

    return(
      


     <div className="App appGrid_H">
          <div id="appSpacer" className="appSpacer_H"></div>
          <TextSlideBox/>
          <ActionBar stateMathTextBox={this.props.showMathEquationBox} 
                     currentMathInput={this.props.typeMathInput}/>
          <PopUpUi/>
    </div>)
  };
}

export default App;
