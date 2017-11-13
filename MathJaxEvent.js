
var submitTimer = undefined;

document.addEventListener('build', function (e) { 
    var equationJson = e.detail;
    clearTimeout(submitTimer);
    submitTimer = setTimeout(function(){
      var divIdEquation = equationJson["selectedMathType"] + "Equation";
      var divEquation = document.getElementById(divIdEquation)
      var math = MathJax.Hub.getAllJax(divIdEquation)[0];

      if("MathML" == equationJson["selectedMathType"]){
        equationJson["mathEquation"] = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' + 
                                        equationJson["mathEquation"] +
                                        '</math>'
      }
      else if("Tex" == equationJson["selectedMathType"]){
        equationJson["mathEquation"] = "{" + equationJson["mathEquation"] + "}"  
      }
      console.log(equationJson["mathEquation"])

      // page on live reloading
      // https://docs.mathjax.org/en/v1.0/typeset.html 
      if("MathML" == equationJson["selectedMathType"]){
          divEquation.innerHTML =  equationJson["mathEquation"]
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,divIdEquation]);
      }
      else{
          MathJax.Hub.Queue(["Text",math,equationJson["mathEquation"]]);
      }

      
    },100);
}, false);

console.log("loaded TestJs")