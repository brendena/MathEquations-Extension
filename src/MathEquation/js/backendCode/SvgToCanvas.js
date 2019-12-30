import {drawSVGCanvas,splitString} from "./DrawSvgToCanvas";

class SvgToCanvas
{
    constructor(svgElement,canvas,color)
    {
        this.canvas = canvas;
        this.color = color;
        this.ctx =  canvas.getContext('2d');
        if(this.ctx == null)
        {
            throw("can't get canvas context");
        }
        var viewBoxString = svgElement.getAttribute("viewBox");
        if  (viewBoxString == null)
        {
            throw("can't get viewbox on svg")
        }
        this.viewBox = new ViewBox(splitString(viewBoxString));
        

        let ratioSvg = this.viewBox.height/this.viewBox.width;
        this.canvas.height =  Math.round(this.canvas.width * ratioSvg);

        let rationCanvasToSvg = this.canvas.width  / this.viewBox.width;
        let rationSvgToCanvas = this.viewBox.width / this.canvas.width;



        //scale the image to are canvas
        this.ctx.scale(rationCanvasToSvg,rationCanvasToSvg)
        //remove the offset from having a orgin of not (0,0)
        this.ctx.translate(-(this.viewBox.minX),-(this.viewBox.minY));
        
        drawSVGCanvas(svgElement.childNodes,this.ctx);
    }

    getPng64(){
        return this.canvas.toDataURL("image/png");
    }
}



class ViewBox{
    minX;
    minY;
    width;
    height;
    constructor(numbArray){
        if(numbArray.length !=4){
            throw("bad viewBox")
        }
        this.minX = numbArray[0];
        this.minY = numbArray[1];
        this.width = numbArray[2];
        this.height = numbArray[3];
    }
}

export default SvgToCanvas;