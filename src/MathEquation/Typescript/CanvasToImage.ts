export class CanvasToImage {
    canvas:HTMLCanvasElement;
    canvasImage:HTMLImageElement;
    constructor(){
    }
    convertSvg(divSvgId:string){
        this.canvas = <HTMLCanvasElement>document.getElementById("HiddenCanvas");
        this.canvasImage = <HTMLImageElement>document.getElementById("CanvasImg");
        var divSvg = document.getElementById(divSvgId);
        if(divSvg == null)
            throw "the elm container didn't load"
        var svg = divSvg.getElementsByTagName("svg");
        if(svg.length >= 2 || svg.length == 0 || svg == null )
            throw "to many or zero svg's - something wrong with mathjax";
        else
            console.log(svg[0]);
            this.drawSvgImage(svg[0]);
    }
    drawSvgImage(svgElement: SVGSVGElement){
        let svgURL = new XMLSerializer().serializeToString(svgElement);
        let ratioSvg = svgElement.clientHeight/svgElement.clientWidth;
        let heigthSvg =  this.canvas.width * ratioSvg;
        this.canvas.style.height = Math.round(heigthSvg) + "px";
        let img  = new Image();
        img.onload = ()=>{                     
            let context = this.canvas.getContext('2d');
            if(context == null)
                throw("can't get context");
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.drawImage(img, 0,0, this.canvas.width, this.canvas.height);
            this.canvasImage.src = this.canvas.toDataURL("image/png");
        }
        img.src = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
    }
}