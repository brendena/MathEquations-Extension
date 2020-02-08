import React from 'react';

class ViewerMathEquations extends React.Component {
  constructor(props){
    super(props);
    this.loadCode = this.loadCode.bind(this);
  }

  loadCode()
  {
    var componentsTag = document.getElementsByTagName("math-equations");
    if(componentsTag.length == 1)
    {   
        console.log("sending the event")
        var event = new Event("UpdateMathEquationTextEvent", {"bubbles":true,"composed":true});
        event.data = this.props.equationText;
        componentsTag[0].dispatchEvent(event);
    }
  }

  render() {


    
    return  <div className="mathEquationsExamples">
                
                <h3 className="equationTitle">{this.props.title}</h3>
                <textarea className="latexTextArea" disabled={true} value={this.props.equationText}>
                      
                </textarea>
                <button className="buttonSubmitTextEquation" onClick={this.loadCode}>Load/Edit Equation</button>

                <div className="generatedImage">\[ {this.props.equationText} \]</div>
            </div>
  }
}

export default ViewerMathEquations;