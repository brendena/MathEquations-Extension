export {Html2CanvasHelper}

const html2canvas: any = require('../../../lib/html2canvas.min.js');

class Html2CanvasHelper {
    constructor(){
    }
    downloadImage(shadowDom :ShadowRoot){
        let divSVG =  document.getElementById("mathEquationSlotLightDom");
        let copyDivSvg = document.getElementById("tmpImageContainer");
        if(divSVG != null && copyDivSvg != null){
            let copyEquation = divSVG.cloneNode(true)
            //copyDivSvg.appendChild(copyEquation);
            document.body.appendChild(copyEquation);
            html2canvas(copyEquation).then(function(canvas:any) {
                console.log(canvas);
                document.body.appendChild(canvas);
                
            });
            
        }
    }

}