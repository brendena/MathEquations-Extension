export {CanvasToImage}
import { ImageTypesEnum } from '../ImageTypes.ts'
import { SvgToCanvas } from './SvgToCanvas.ts'
/*
These whered used when the projects was using mathjax that 
used svg images

*/
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
        return (new SvgToCanvas(svg, this.canvas, color).getPng64());
    }

    downloadImage(divSvgId:string,imageType:ImageTypesEnum,color:string){
        var svg = this.getSvg(divSvgId);
        var imageData = "";
        if(imageType == ImageTypesEnum.Png){
            console.log("downloading image")
            imageData = (new SvgToCanvas(svg, this.canvas, color).getPng64());
        }
        else if(imageType == ImageTypesEnum.Svg){
            var svgClone = <SVGSVGElement>svg.cloneNode(true);
            svgClone.style.color = color;
            imageData = this.convertSvgToData(svgClone)
        }
        var downloadButton = document.getElementById("DownloadButton");
        if(downloadButton != null){
            downloadButton.setAttribute("href", imageData);
        }
        else{
            throw "couldn't find downloadButton";
        }
    }

    private convertSvgToData(svgElement:SVGSVGElement){
        let svgURL = new XMLSerializer().serializeToString(svgElement);
        return 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
    }
}