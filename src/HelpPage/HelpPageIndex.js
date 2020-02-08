import React from 'react';
import ViewerMathEquations from "./ViewerMathEquations"
import './styles.css';
import exampleLatexData from "./exampleLatexEquations"

class HelpPageApp extends React.Component {
  render() {
    console.log(exampleLatexData)
    return <div>
      <h1>Examples</h1>
      
      {exampleLatexData.map((item) =>
        <ViewerMathEquations key={item.title} title={item.title} equationText={item.equationText}/>
      )}
      
    </div>;
  }
}

export default HelpPageApp;