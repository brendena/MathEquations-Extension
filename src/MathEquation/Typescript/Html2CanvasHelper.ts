import { ImageTypesEnum} from './ImageTypes.ts'
export {Html2CanvasHelper}
class Html2CanvasHelper {
    constructor(){
    }

    downloadImagePromise(imageType :ImageTypesEnum, imageSize:number,  color: string  ): Promise<string>{
        /*
        let divImage =  document.getElementById("mathEquationSlotLightDom");
        let copyDivSvg = document.getElementById("tmpImageContainer");

        if(divImage != null && copyDivSvg != null){
            //grab just the katex math equation
            let firstItem = divImage.firstChild;
            if(firstItem != null){
                let copyEquation = firstItem.cloneNode(true);
                copyDivSvg.appendChild(copyEquation);
                copyDivSvg.style.color = color;
                copyDivSvg.style.fontSize = imageSize + "px";
                                
                return new Promise((resolve, reject) => {
                    console.log(html2canvas)
                    console.log(copyEquation);
                    html2canvas(copyEquation,{
                        allowTaint:true,
                        useCORS:true}).then((canvas:any)=> {
                        console.log(canvas);
                        if(imageType == ImageTypesEnum.Png){
                            //resolve(canvas.toDataURL("image/png"));
                        }
                        else if(imageType == ImageTypesEnum.Jpg){
                            //resolve(canvas.toDataURL("image/jpeg"));
                        }
                    }).catch((error:any)=>{
                        console.log(error);
                        reject("html2canvas failed")
                    });  
                });
                
            }

        }
        */
        //fail
        return new Promise((resolve, reject) => {
            console.log('Faild to load image');
            reject();
        });
    }
}