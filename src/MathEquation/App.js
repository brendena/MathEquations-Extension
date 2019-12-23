import React from 'react';
import './App.css';
import * as Actions from './js/actions/index'
import  store  from "./js/store/index"

import { connect } from 'react-redux';
import  ActionBar  from "./js/components/ActionBar"
import TextSlideBox from "./js/components/TextSlideBox"
import SVGToCanvas from "./js/components/SVGToCanvas"

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
    this.state = {
        title:""
    }
  }
  addArticle(){
    console.log("shit might be working");

    store.dispatch(Actions.addArticle({ title: 'React Redux Tutorial for Beginners', id: Math.floor(Math.random() * 10000) }));

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
          <SVGToCanvas canvasHeight={500} 
                       canvasWidth={500}>
          </SVGToCanvas>
    </div>)
  };
}

export default App;
