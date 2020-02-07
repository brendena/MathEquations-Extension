import {drawSVGCanvas,splitString} from "./DrawSvgToCanvas";
import  * as ConstTypes  from "../constants/constsTypes"

class SvgToCanvas
{
    constructor(svgElement,canvas,color,imageSizingSettings)
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
        
        console.log("svgToCanvase");

        var tempHeight = this.canvas.height;
            
        if(imageSizingSettings == ConstTypes.ImageDimensionsSettings.UserDefinedHeight )
        {
            console.log("sizing width");
            let ratioSvg = this.viewBox.width/this.viewBox.height;
            this.canvas.width =  Math.round(this.canvas.height * ratioSvg);
        }
        else if(imageSizingSettings == ConstTypes.ImageDimensionsSettings.UserDefinedWidth ||
                imageSizingSettings == ConstTypes.ImageDimensionsSettings.UserDefinedHeightAndHeight)
        {
            let ratioSvg = this.viewBox.height/this.viewBox.width;
            this.canvas.height =  Math.round(this.canvas.width * ratioSvg);
        }
        
        

        let rationCanvasToSvg = this.canvas.width  / this.viewBox.width;



        //scale the image to are canvas
        this.ctx.scale(rationCanvasToSvg,rationCanvasToSvg)
        //remove the offset from having a orgin of not (0,0)
        this.ctx.translate(-(this.viewBox.minX),-(this.viewBox.minY));



        drawSVGCanvas(svgElement.childNodes,this.ctx,color);

        
        if(imageSizingSettings == ConstTypes.ImageDimensionsSettings.UserDefinedHeightAndHeight)
        {
            console.log(tempHeight)

            /*
            let tempImage = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
            console.log(tempImage)
            this.canvas.height = tempHeight;
            
            this.ctx.scale(1,0.5)
            this.ctx.putImageData(tempImage,0,0)
            */
            let tempImage = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
            let tmpCanvas = this.canvas.cloneNode(true);
            tmpCanvas.getContext('2d').putImageData(tempImage,0,0)



            this.canvas.height = tempHeight;
            this.ctx.drawImage(tmpCanvas,0,0,tmpCanvas.width,tmpCanvas.height,0,0,this.canvas.width,this.canvas.height)
            console.log(tmpCanvas)
        }


        

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