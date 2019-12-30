import React from 'react';
import './App.css';
import * as Actions from './js/actions/index'
import  store  from "./js/store/index"

import { connect } from 'react-redux';
import  ActionBar  from "./js/components/ActionBar"
import TextSlideBox from "./js/components/TextSlideBox"
import SVGToCanvas from "./js/components/SVGToCanvas"
import * as ConstsID from "./js/constants/constsID"

@connect((store)=>{
  return{
    pageHeight: store.propsPage.height,
    showMathEquationBox: store.propsPage.showMathEquationTextBox,
    typeMathInput: store.propsPage.typeMathInput
  }
})
class App extends React.Component{
  constructor(props){
    super(props);
  }

  render (){
    var position = {bottom: "0px",
                    height: this.props.pageHeight+"vh"
                    }
    if(!this.props.showMathEquationBox){
      position.bottom = "-" + this.props.pageHeight + "vh";
      console.log("test")
      
    }

    return(
      


     <div style={position} className="App">
          <TextSlideBox/>
          <ActionBar stateMathTextBox={this.props.showMathEquationBox} 
                     currentMathInput={this.props.typeMathInput}/>
          <SVGToCanvas canvasHeight={100} 
                       canvasWidth={100}>
          </SVGToCanvas>
    </div>)
  };
}

export default App;
