export class SvgToCanvas {
    viewBox: ViewBox;
    canvas : HTMLCanvasElement;
    ctx    : CanvasRenderingContext2D;
    constructor(svgElement:SVGSVGElement,canvas:HTMLCanvasElement ){
        console.log(svgElement)
        this.canvas = canvas;
        let ctx = this.canvas.getContext('2d');
        if(ctx == null)
            throw("can't get context");


        this.ctx = ctx
        var viewBoxString = svgElement.getAttribute("viewBox");
        if  (viewBoxString == null)
            throw("can't get viewbox on svg")
        this.viewBox = new ViewBox(this.splitString(viewBoxString));

        
        let ratioSvg = this.viewBox.height/this.viewBox.width;
        this.canvas.height =  Math.round(this.canvas.width * ratioSvg);


        let rationCanvasToSvg = this.canvas.width /  this.viewBox.width;
        let rationSvgToCanvas = this.viewBox.width/this.canvas.width;



        //scale the image to are canvas
        this.ctx.scale(rationCanvasToSvg,rationCanvasToSvg)
        //remove the offset from having a orgin of not (0,0)
        this.ctx.translate(-(this.viewBox.minX),-(this.viewBox.minY));
        
        this.recursiveLoopTags(svgElement.childNodes);
        
    }



    private recursiveLoopTags(childNodes:NodeList){
        let tag:Node;
        for(var i = 0; i < childNodes.length; i++){
            tag = childNodes[i];
            switch(tag.nodeName){
                case "g":
                    if("transform" in tag.attributes){
                        var t = this.splitString(tag.attributes.getNamedItem("transform").value)
                        this.ctx.transform(t[0],t[1],t[2],t[3],t[4],t[5]);
                        this.recursiveLoopTags(tag.childNodes);
                        //remove the last transform
                        this.ctx.transform(t[0],t[1],t[2],t[3],-(t[4]),-(t[5]));
                    }
                    
                    break;
                case "path":
                    if("d" in tag.attributes){
                        console.log(tag)
                        var d = <any>tag.attributes.getNamedItem("d").value;
                        var path = <any>new Path2D(d);
                        if("transform" in tag.attributes){
                            var transformString = tag.attributes.getNamedItem("transform").value;
                            var t = this.splitString(transformString)
                            this.ctx.transform(t[0],t[1],t[2],t[3],t[4],t[5]);
                            this.ctx.fill(path);
                            

                            if(transformString.match(/translate/g) != null){
                                this.ctx.transform(t[0],t[1],t[2],t[3],-(t[4]),-(t[5]));
                            }
                            else if(transformString.match(/scale/g) != null){
                                console.log("scale")
                                
                                this.ctx.transform(1/t[0],t[1],t[2],1/t[3],(t[4]),(t[5]));
                            }
                        }
                        else{
                            this.ctx.fill(path);
                        }
                        
                    }
                    break;


                default:
                    break;
            }

        }
        
    }
    private expandTransformTypes(type:TransformTypes, x:number,y?:number){
        let returnTransform: number[];
        //location for bellow matrices
        //https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform

        switch(type){
            case TransformTypes.Translate:
                if(y != undefined || y != null)
                    returnTransform = [1,0,0,1,x,y]
                else    
                    throw("can't use translate without y")
                break;
            case TransformTypes.Scaling:
                console.log("getting scaled")
                console.log(x)
                console.log(y)
                if(y != undefined || y != null)
                    returnTransform = [x,0,0,y,0,0];
                else
                    returnTransform = [x,0,0,x,0,0];
                break;
            default:
                throw("none selected")
        }
        return returnTransform;
    }

    private splitString(attribute:string):number[]{
        var stringArray:string[];
        if(attribute.match(/\(/g) != null  ){
            var firstHalf = attribute.split("(")[1]
            var stringNumbers = firstHalf.split(")")[0]
            if(stringNumbers.match(/,/g) != null){
                stringArray = stringNumbers.split(",")
            }
            else{
                stringArray = stringNumbers.split(" ")
            }
        }
        else{
            stringArray = attribute.split(" ")
        }
        
        console.log(stringArray)
        var returnIntArray:number[] = new Array(stringArray.length);
        for(var i = 0; i < stringArray.length; i++){
            returnIntArray[i] = parseFloat(stringArray[i]);
        }

        if(attribute.match(/translate/g) != null){
            
            return this.expandTransformTypes(TransformTypes.Translate, returnIntArray[0],returnIntArray[1])
        }
        else if(attribute.match(/scale/g) != null){
            console.log(returnIntArray);
            if(returnIntArray.length == 1)
                return this.expandTransformTypes(TransformTypes.Scaling, returnIntArray[0])
            else
                return this.expandTransformTypes(TransformTypes.Scaling, returnIntArray[0],returnIntArray[1])
        }
        return returnIntArray;
    }   
}

const enum TransformTypes {
    Translate,
    Scaling,
    //rotate not using
}
class ViewBox{
    minX:number;
    minY:number;
    width:number;
    height:number;
    constructor(numbArray:number[]){
        if(numbArray.length !=4){
            throw("bad viewBox")
        }
        this.minX = numbArray[0];
        this.minY = numbArray[1];
        this.width = numbArray[2];
        this.height = numbArray[3];
    }
}