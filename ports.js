var portJsCode = function(){
    console.log(this)
    
    var ConvertImageObject = function(root){
        return {
            "canvas" : root.getElementById("HiddenCanvas"),
            "canvasImage" : root.getElementById("CanvasImg"),
            "_drawSvgImage": function(svgElement){
                var svgURL = new XMLSerializer().serializeToString(svgElement);
                var ratioSvg = svgElement.clientHeight/svgElement.clientWidth;
                var heigthSvg =  this.canvas.width * ratioSvg;
                this.canvas.height = heigthSvg + "px";
                var img  = new Image();
                var that = this;
                img.onload = function(){                      //width // height
                    that.canvas.getContext('2d').drawImage(this, 0,0, that.canvas.width, that.canvas.height);
                    that.canvasImage.src = canvas.toDataURL("image/png");
                }
                img.src = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
            },
            "convertImage" : function (divSvgId){
                var divSvg = root.getElementById(divSvgId);
                if(divSvg != null){
                    var svg = divSvg.getElementsByTagName("svg");
                    if(svg.length >= 2 || svg.length == 0)
                        throw "to many or zero svg's - something wrong with mathjax";
                    else
                        this._drawSvgImage(svg[0]);
                }
                else    
                    throw "the elm container didn't load"
            }
        }
    }

    this.convertImageObject = ConvertImageObject(this.shadowRoot);
    

    this.app.ports.getPageYOffset.subscribe(function(){
        var offsetHeight = window.pageYOffset;
        this.app.ports.returnBoundingClientRect.send(offsetHeight.toString());
    }.bind(this));

    this.app.ports.sumitEquation.subscribe(function(str){
        //jsonElmRequest = JSON.parse(str)
        //console.log(jsonElmRequest);
    });

    var convertImageTimer = undefined;
    var submitTimer = undefined;
    this.app.ports.updateEquation.subscribe(function (equationObject) {
        clearTimeout(submitTimer);
        
        var equationJson = JSON.parse(equationObject)
        var divIdEquation = equationJson["selectedMathType"] + "Equation";
        MathJax.Hub.Queue(["Typeset",MathJax.Hub], divIdEquation);
        submitTimer = setTimeout(function(){
            var divEquation = this.shadowRoot.getElementById(divIdEquation)
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

        clearTimeout(convertImageTimer);
        convertImageTimer = submitTimer = setTimeout(function(){
            this.convertImageObject.convertImage(divIdEquation)
        }.bind(this),500);
    }.bind(this));

}










