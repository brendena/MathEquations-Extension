export {CanvasToImage}
import { ImageTypesEnum } from './ImageTypes.ts'

class CanvasToImage {
    canvas:HTMLCanvasElement;
    canvasImage:HTMLImageElement;
    constructor(){
    }
    private getSvg(divSvgId:string){
        this.canvas = <HTMLCanvasElement>document.getElementById("HiddenCanvas");
        this.canvasImage = <HTMLImageElement>document.getElementById("CanvasImg");
        var divSvg = document.getElementById(divSvgId);
        if(divSvg == null)
            throw "the elm container didn't load"
        var svg = divSvg.getElementsByTagName("svg");
        if(svg.length >= 2 || svg.length == 0 || svg == null )
            throw "to many or zero svg's - something wrong with mathjax";
        else
            return svg[0];
    }
    convertSvg(divSvgId:string,color:string){
        var svg = this.getSvg(divSvgId);
        this.drawSvgImage(svg,color);
    }
    drawSvgImage(svgElement: SVGSVGElement,color:string){
        var svgClone = <SVGSVGElement>svgElement.cloneNode(true);
        svgClone.style.color = color;
        let svgURL = new XMLSerializer().serializeToString(svgClone);
        let svgWidth = svgElement.width.baseVal.value
        let svgHeight = svgElement.height.baseVal.value

        let ratioSvg = svgHeight/svgWidth;
        let heigthSvg =  this.canvas.width * ratioSvg;
        let canvasHeightNumber = Math.round(heigthSvg);
        this.canvas.height = Math.round(heigthSvg);
        let img  = new Image();
        img.onload = ()=>{                     
            let context = this.canvas.getContext('2d');
            if(context == null)
                throw("can't get context");
            
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.drawImage(img, 0,0, this.canvas.width, this.canvas.height);
            this.canvasImage.src = this.canvas.toDataURL("image/png");
        }
        
        let svgData = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
        img.src = svgData;
    }
    downloadImage(divSvgId:string,imageType:ImageTypesEnum,color:string){
        this.getSvg(divSvgId);
        var imageData = "";
        if(imageType == ImageTypesEnum.Png){
            console.log("downloading image")
            var imageData = this.canvasImage.src;
        }
        else if(imageType == ImageTypesEnum.Svg){
            var svg = this.getSvg(divSvgId);
            var svgClone = <SVGSVGElement>svg.cloneNode(true);
            svgClone.style.color = color;
            let svgURL = new XMLSerializer().serializeToString(svgClone);
            imageData = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
        }
        var downloadButton = document.getElementById("DownloadButton");
        if(downloadButton != null){
            downloadButton.setAttribute("href", imageData);
        }
        else{
            throw "couldn't find downloadButton";
        }
    }
}