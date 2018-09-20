import { ImageTypesEnum} from './ImageTypes.ts'
export {Html2CanvasHelper}
var html2canvas: any = require('../../../lib/html2canvas.min.js');

class Html2CanvasHelper {
    constructor(){
    }

    downloadImagePromise(divImage:HTMLElement, imageType :ImageTypesEnum, imageSize:number,  color: string  ): Promise<string>{
        
        console.log("startign to go through this")
        let copyDivSvg = document.getElementById("tmpImageContainer");


        divImage.style.color = color;
        divImage.style.fontSize = imageSize + "px";
                        
        return new Promise((resolve, reject) => {
            console.log(html2canvas)
            console.log(divImage);
            html2canvas(divImage).then((canvas:any)=> {
                console.log(canvas);
                console.log(imageType)
                if(imageType == ImageTypesEnum.Png){
                    resolve(canvas.toDataURL("image/png"));
                }
                else if(imageType == ImageTypesEnum.Jpg){
                    resolve(canvas.toDataURL("image/jpeg"));
                }
            }).catch((error:any)=>{
                console.log(error);
                reject("html2canvas failed")
            });  
        });
    }
}