window.onload = function(){

console.log(app)
var hiddenCanvasId = document.getElementById("HiddenCanvas")
//var clipboard = new Clipboard('#NavSubmitButton');
//**
new Clipboard("#NavSubmitButton")
var submitButton = document.getElementById("NavSubmitButton")
submitButton.setAttribute("data-clipboard-action", "copy");
submitButton.setAttribute("data-clipboard-target", "#CanvasImgContainer");
//*/



var convertImageTimer = undefined;
app.ports.updateEquation.subscribe(function (equationObject) {
    var equationJson = JSON.parse(equationObject)
    var event = new CustomEvent('build',{detail:  equationJson});
    document.dispatchEvent(event);
    clearTimeout(convertImageTimer);
    convertImageTimer = submitTimer = setTimeout(function(){
        convertimage(equationJson)
    },500);
});

app.ports.sumitEquation.subscribe(function(str){
    //jsonElmRequest = JSON.parse(str)
    //console.log(jsonElmRequest);

});

app.ports.getPageYOffset.subscribe(function(){
    var offsetHeight = window.pageYOffset;
    app.ports.returnBoundingClientRect.send(offsetHeight.toString());
});

var convertimage = function(jsonElmRequest){
    var divSvg = document.getElementById(jsonElmRequest["selectedMathType"] + "Equation");
    console.log(divSvg)
    if(divSvg != null){
        var svg = divSvg.getElementsByTagName("svg")[0];
        var canvas = hiddenCanvasId;
        drawInlineSVG(svg, function(){
            var image = canvas.toDataURL("image/png");
            document.getElementById("CanvasImg").src = image;
        });    
    }
} 

function drawInlineSVG(svgElement, callback){
    var svgURL = new XMLSerializer().serializeToString(svgElement);
    var canvas = hiddenCanvasId;
    var ratioSvg = svgElement.clientHeight/svgElement.clientWidth;
    var heigthSvg =  canvas.width * ratioSvg;
    canvas.height = heigthSvg; //look nicer with heightSvg + heightSvg *.2
    var img  = new Image();
    img.onload = function(){                      //width // height
    canvas.getContext('2d').drawImage(this, 0,0, canvas.width, canvas.height);
    callback();
    }
    img.src = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
}

}