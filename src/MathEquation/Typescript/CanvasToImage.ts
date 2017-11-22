export {CanvasToImage}
import { ImageTypesEnum } from './ImageTypes.ts'
import { SvgToCanvas } from './SvgToCanvas.ts'

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
    convertSvg(divSvgId:string,color:string,test:DataTransfer){
        var svg = this.getSvg(divSvgId);
        //this.drawSvgImage(svg,color,test);
        new SvgToCanvas(svg, this.canvas)
    }
    drawSvgImage(svgElement: SVGSVGElement,color:string,test:DataTransfer){
        var svgClone = <SVGSVGElement>svgElement.cloneNode(true);
        svgClone.style.color = color;
        let svgURL = new XMLSerializer().serializeToString(svgClone);
        let svgWidth = svgElement.width.baseVal.value
        let svgHeight = svgElement.height.baseVal.value

        let ratioSvg = svgHeight/svgWidth;
        let heigthSvg =  this.canvas.width * ratioSvg;
        let canvasHeightNumber = Math.round(heigthSvg);
        this.canvas.height = Math.round(heigthSvg);

        
        //context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //context.drawImage(img, 0,0, this.canvas.width, this.canvas.height);
        /*
        var asdf =  function(tags:HTMLElement[]){
            for(var i = 0; i < tags.length; i++){
                var tag = tags[i];
                if(tag.tagName == "path"){
                    console.log("path tag")
                }
                else if (tag.tagName == "g"){
                    console.log("g tag")
                    console.log(tag.childNodes)
                    asdf(tag.childNodes);
                }
            }


        }
        */

    }
    getDataURI(divSvgId:string,color:string):string{
        this.getSvg(divSvgId);
        var svg = this.getSvg(divSvgId);
        var svgClone = <SVGSVGElement>svg.cloneNode(true);
        svgClone.style.color = color;
        let svgURL = new XMLSerializer().serializeToString(svgClone);
        var imageData = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgURL);
        return imageData;
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