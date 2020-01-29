
function drawSVGCanvas(childNodes,ctx,color){
    var defs = childNodes[0];
    var useTags = {};
    let tag;
    for(var i = 0; i < defs.childNodes.length; i++)
    {
        
        tag = defs.childNodes[i];
        useTags[tag.id] = tag.attributes.getNamedItem("d").value;
    }
    recursiveLoopTags(childNodes,ctx,useTags,color);
}




function recursiveLoopTags(childNodes,ctx,useTags,color){
    let tag;
    for(let i = 0; i < childNodes.length; i++)
    {
        
        tag = childNodes[i];
        switch(tag.nodeName)
        {
            case "use":
                let userLink = tag.getAttribute("xlink:href").substr(1);
                let path = new Path2D(useTags[userLink]);
                ctx.fillStyle = color;
                if("transform" in tag.attributes){
                    let transformString = tag.attributes.getNamedItem("transform").value;
                    let canvasTransfer = new CanvasTransformerClass(ctx, transformString)
                    canvasTransfer.initTransform(ctx);
                    ctx.fill(path);
                    canvasTransfer.reverseTransform(ctx);
                }
                else
                {
                    ctx.fill(path);
                }
                break;
            case "g":
                if("transform" in tag.attributes)
                {
                    let transformString = tag.attributes.getNamedItem("transform").value;

                    let canvasTransfer = new CanvasTransformerClass(ctx, transformString)
                    canvasTransfer.initTransform(ctx);
                    recursiveLoopTags(tag.childNodes,ctx,useTags,color);
                    canvasTransfer.reverseTransform(ctx);
                }
                else
                {
                    if(tag.childNodes.length > 0)
                    {
                        recursiveLoopTags(tag.childNodes,ctx,useTags,color);
                    }
                }
                break;
            default:
                break;
        }

    }
    
}
class CanvasTransformerClass
{
    constructor(ctx,transformString)
    {
        this.ctx = ctx;
        this.transformSubStrings = transformString.split(") ");
        for(let j =0; j < this.transformSubStrings.length - 1; j++)
        {
            this.transformSubStrings[j] += ")"
        }
    }

    initTransform(){
        this.transformSubStrings.forEach(transform=>{
            let t = splitString(transform)
            this.ctx.transform(t[0],t[1],t[2],t[3],t[4],t[5]);
        });
    }

    reverseTransform()
    {
        this.transformSubStrings = this.transformSubStrings.reverse();
        this.transformSubStrings.forEach(transform=>{
            let t = splitString(transform)
            //remove the last transform
            if(transform.match(/translate/g) != null)
            {
                this.ctx.transform(t[0],t[1],t[2],t[3],-(t[4]),-(t[5]));
            }
            else if(transform.match(/scale/g) != null)
            {
                this.ctx.transform(1/t[0],t[1],t[2],1/t[3],(t[4]),(t[5]));
            }
        });
    }
}

const TransformTypes = {
    Translate: 'Translate',
    Scaling: "Scaling"
}

function expandTransformTypes(type, x,y)
{
    let returnTransform = [];
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
};


function splitString(attribute)
{
    var stringArray;
    if(attribute.match(/\(/g) != null  )
    {
        var firstHalf = attribute.split("(")[1]
        var stringNumbers = firstHalf.split(")")[0]
        if(stringNumbers.match(/,/g) != null)
        {
            stringArray = stringNumbers.split(",")
        }
        else
        {
            stringArray = stringNumbers.split(" ")
        }
    }
    else
    {
        stringArray = attribute.split(" ")
    }
    
    var returnIntArray = new Array(stringArray.length);
    for(var i = 0; i < stringArray.length; i++)
    {
        returnIntArray[i] = parseFloat(stringArray[i]);
    }

    if(attribute.match(/translate/g) != null)
    {    
        return expandTransformTypes(TransformTypes.Translate, returnIntArray[0],returnIntArray[1])
    }
    else if(attribute.match(/scale/g) != null)
    {
        if(returnIntArray.length == 1)
            return expandTransformTypes(TransformTypes.Scaling, returnIntArray[0])
        else
            return expandTransformTypes(TransformTypes.Scaling, returnIntArray[0],returnIntArray[1])
    }
    return returnIntArray;
}  

export {drawSVGCanvas,splitString}