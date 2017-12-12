export class SvgToCanvas {
    viewBox: ViewBox;
    canvas : HTMLCanvasElement;
    ctx    : CanvasRenderingContext2D;
    color  : string;
    constructor(svgElement:SVGSVGElement,canvas:HTMLCanvasElement,color:string ){
        console.log(svgElement)
        this.canvas = canvas;
        this.color = color;
        console.log("color");
        console.log(this.color);
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
    public getPng64(){
        return this.canvas.toDataURL("image/png");
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
                        var d = <any>tag.attributes.getNamedItem("d").value;
                        //this is where i would have path is undefined
                        var path = <any>new Path2D(d);
                        this.ctx.fillStyle = this.color;
                        if("transform" in tag.attributes){
                            var transformString = tag.attributes.getNamedItem("transform").value;
                            var t = this.splitString(transformString)
                            this.ctx.transform(t[0],t[1],t[2],t[3],t[4],t[5]);
                            this.ctx.fill(path);
                            

                            if(transformString.match(/translate/g) != null){
                                this.ctx.transform(t[0],t[1],t[2],t[3],-(t[4]),-(t[5]));
                            }
                            else if(transformString.match(/scale/g) != null){
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
        
        var returnIntArray:number[] = new Array(stringArray.length);
        for(var i = 0; i < stringArray.length; i++){
            returnIntArray[i] = parseFloat(stringArray[i]);
        }

        if(attribute.match(/translate/g) != null){
            
            return this.expandTransformTypes(TransformTypes.Translate, returnIntArray[0],returnIntArray[1])
        }
        else if(attribute.match(/scale/g) != null){
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



//https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

class SVGPathToPath2d{
    path2D: Path2D;
    svgPath: string;
    x: number = 0;
    y: number = 0;
    constructor(svgPath: string ){
        this.path2D = new Path2D;
        this.svgPath = svgPath;
        let splittPathOperators = this.svgPath.split(/(?=[a-zA-Z]+)/g);

        console.log(splittPathOperators)
        for(var i=0; i < splittPathOperators.length; i++){
            let svgPathType = splittPathOperators[i].slice(0,1);
            let pathVariables = splittPathOperators[i].slice(1).split(" ");
            if(pathVariables[0] == "")
                pathVariables = pathVariables.slice(1);
            if(pathVariables[pathVariables.length -1] == "")
                pathVariables.pop();


            var pathVariablesInt:number[] = new Array(pathVariables.length);
            for(var j = 0; j < pathVariables.length; j++){
                pathVariablesInt[j] = parseFloat(pathVariables[j]);
            }
            //these are absoulte references not relative
            console.log(pathVariables)
            switch (svgPathType){
                case ("M"):
                    this.path2D.moveTo(pathVariablesInt[0],pathVariablesInt[1]);
                    this.x = pathVariablesInt[0];
                    this.y = pathVariablesInt[1];
                    break;
                case ("c"):
                    
                    this.path2D.bezierCurveTo(this.x + pathVariablesInt[0],this.y + pathVariablesInt[1],this.x + pathVariablesInt[2],this.y + pathVariablesInt[3],this.x + pathVariablesInt[4], this.y  + pathVariablesInt[5])
                    this.x += pathVariablesInt[4]
                    this.y += pathVariablesInt[5]
                    break;
                case ("l"):
                    this.x += pathVariablesInt[0]
                    this.y += pathVariablesInt[1]
                    this.path2D.lineTo(this.x,this.y)
                    break;
                case ("h"):
                    this.x += pathVariablesInt[0]
                    this.path2D.lineTo(this.x,this.y)
                    break;
                case ("v"):
                    this.y += pathVariablesInt[0]
                    this.path2D.lineTo(this.x, this.y)
                    break;
                case ("Z"):
                    this.path2D.closePath();
                    break;
                default:
                    throw ("don't support '" + svgPathType +"' path type yet");
            }
        }
        console.log(this.path2D)
    }
    getPath():Path2D{
        return this.path2D;
    }
}