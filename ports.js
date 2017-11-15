var portJsCode = function(){
    console.log(this)
    
    var ConvertImageObject = function(){
        var canvas = document.getElementById("HiddenCanvas");
        var canvasImage = document.getElementById("CanvasImg");
        var _drawSvgImage = function(svgElement){
            var svgURL = new XMLSerializer().serializeToString(svgElement);
            var ratioSvg = svgElement.clientHeight/svgElement.clientWidth;
            var heigthSvg =  canvas.width * ratioSvg;
            canvas.style.height = Math.round(heigthSvg) + "px";
            var img  = new Image();
            img.onload = function(){                      //width // height
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                canvas.getContext('2d').drawImage(this, 0,0, canvas.width, canvas.height);
                canvasImage.src = canvas.toDataURL("image/png");
            }
            img.src = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
        }
        return {
            "convertImage" : function (divSvgId){
                var divSvg = document.getElementById(divSvgId);
                if(divSvg != null){
                    var svg = divSvg.getElementsByTagName("svg");
                    if(svg.length >= 2 || svg.length == 0)
                        throw "to many or zero svg's - something wrong with mathjax";
                    else
                        console.log(svg[0]);
                        _drawSvgImage(svg[0]);
                }
                else    
                    throw "the elm container didn't load"
            }
        }
    }

    this.convertImageObject = ConvertImageObject();
    

    this.app.ports.getPageYOffset.subscribe(function(elmEvent){
        /*code for when this is not in a iframe */
        //var offsetHeight = window.pageYOffset;
        //this.app.ports.returnBoundingClientRect.send(offsetHeight.toString());

        var orgin = document.getElementById("originText").innerHTML;
        parent.postMessage(elmEvent,origin);

    }.bind(this));

    this.app.ports.sumitEquation.subscribe(function(str){
        //jsonElmRequest = JSON.parse(str)
        //console.log(jsonElmRequest);
    });

    this.convertImageTimer = undefined;
    this.submitTimer = undefined;
    this.app.ports.updateEquation.subscribe(function (equationObject) {
        clearTimeout(this.submitTimer);
        
        var equationJson = JSON.parse(equationObject)
        var divIdEquation = equationJson["selectedMathType"] + "Equation";
        this.submitTimer = setTimeout(function(){
            var divEquation = document.getElementById(divIdEquation)
            console.log(divEquation)
            var math = MathJax.Hub.getAllJax(divIdEquation)[0];
            console.log(math)
            if("MathML" == equationJson["selectedMathType"]){
                equationJson["mathEquation"] = '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">' + 
                                            equationJson["mathEquation"] +
                                            '</math>'
            }
            else if("Tex" == equationJson["selectedMathType"]){
                equationJson["mathEquation"] = "{" + equationJson["mathEquation"] + "}"  
            }

            // page on live reloading
            // https://docs.mathjax.org/en/v1.0/typeset.html 
            if("MathML" == equationJson["selectedMathType"]){
                divEquation.innerHTML =  equationJson["mathEquation"]
                MathJax.Hub.Queue(["Typeset",MathJax.Hub,divIdEquation]);
            }
            else{
                MathJax.Hub.Queue(["Text",math,equationJson["mathEquation"]]);
            }

        }.bind(this),100);

        clearTimeout(this.convertImageTimer);
        this.convertImageTimer = submitTimer = setTimeout(function(){
            this.convertImageObject.convertImage(divIdEquation)
        }.bind(this),500);
    }.bind(this));

}










