import { ElmPort } from './ElmPort.ts'
import { MathTypes,ConvertMathTypes } from './MathTypes.ts'
import { PostMessageHandler } from './PostMessageHandler.ts'
import { ImageTypesEnum} from './ImageTypes.ts'
import { Html2CanvasHelper } from './Html2CanvasHelper.ts'
import { setTimeout } from 'timers';

console.log("loading MathEquations")

const katex : any = require('katex');
const Elm : any = require('../Elm/Main.elm');


export class MathEquationAnywhere {
    shadowDom : HTMLDivElement;
    container: HTMLDivElement;
    slotLightDom : HTMLElement;
    tmpImageContainer: HTMLDivElement;
    offScreenItemIframe: HTMLIFrameElement;

    app:any;
    postMessageHandler: PostMessageHandler;
    html2CanvasHelper = new Html2CanvasHelper();
    createBase64ImageTimerId : number = -1 ;
    pngBase64Image : string = "";
    baseUrl: string;


    
    color: string = "#000000";
    mathType: MathTypes = MathTypes.NoMathType;
    constructor(_baseUrl : string){
        this.baseUrl = _baseUrl;
        this.shadowDom = document.createElement("div");

        this.container = document.createElement("div");
        this.container.id = "MathEquationContainer";
        this.container.style.width = "100%";
        this.container.style.position = "fixed"
        this.container.style.bottom = "0"
        this.container.style.left = "0"
        this.container.style.background = "white";
        this.container.style.zIndex = "500000"
        this.shadowDom.appendChild(this.container);
        


        /*load certain items off screen on the actuall dom.
          This pervents them from being slotted into the main program
          which is needed for the html rendering library.*/
        this.offScreenItemIframe = document.createElement("iframe");
        this.offScreenItemIframe.id = "MathEquationsOffscreenItems";
        this.offScreenItemIframe.style.position = "fixed";
        this.offScreenItemIframe.style.left = "-100%";
        this.offScreenItemIframe.style.top = "-100%";

        document.body.appendChild(this.offScreenItemIframe);
        



        var styleLinkKatex = document.createElement("link");
        styleLinkKatex.href = this.baseUrl + "katex.min.css" 
        styleLinkKatex.rel = "stylesheet";
        styleLinkKatex.type = "text/css";

        

        var scriptIframe = document.createElement("script")
        scriptIframe.src = this.baseUrl + "iframe2Canvas.js"

        

        this.connectedCallback();


        
        setTimeout(() => {
            if(this.offScreenItemIframe.contentDocument != null){
                this.offScreenItemIframe.contentDocument.body.appendChild(styleLinkKatex);
                this.offScreenItemIframe.contentDocument.body.appendChild(scriptIframe);
            }  
        }, 1000);


        window.onmessage = (event)=>{
            var messageData = event.data;
            if(messageData != undefined){
                if(messageData["returnImage"] != null &&
                   messageData["imageType"] != null){
                    if(messageData["imageType"] == ImageTypesEnum.Png){
                        this.pngBase64Image = messageData["returnImage"];
                    }
                    if(messageData["downloadImage"] == true){
                        var downloadButton = document.getElementById("DownloadButton");
                        if(downloadButton != null){
                            downloadButton.setAttribute("href", messageData["returnImage"]);
                        }
                    }
                }
            }

        };
    }
    connectedCallback() {

        let script = document.createElement("script");
        script.src = this.baseUrl + "mathEquationComponentOnload.js"
        this.shadowDom.appendChild(script);

        /**********************setting-elm-up************************************/
        this.app = Elm.Main.embed(this.container,{
            "baseUrl": this.baseUrl
        });

        this.app.ports.updateEquation.subscribe((elmJsonString:string)=> {
            var elmObject = new ElmPort(elmJsonString);
            
         
            try{
                katex.render(elmObject.mathEquation, document.getElementById("DisplayEquation"));
                window.clearTimeout(this.createBase64ImageTimerId);
                this.createBase64ImageTimerId = window.setTimeout(() => {
                    let divImage =  document.getElementById("DisplayEquation");
                    if(this.offScreenItemIframe.contentWindow != null && divImage != null){
                        this.offScreenItemIframe.contentWindow.postMessage({"imageType": ImageTypesEnum.Png,
                                                                            "imageSize": elmObject.mathEquationFontSize,
                                                                            "color": elmObject.mathEquationColor,
                                                                            "EquationHtml": divImage.innerHTML},"*") 
                    }
                }, 500);
            }
            catch(errorCantConvertEquation){
                console.error(errorCantConvertEquation);
            }
        });

        this.app.ports.setEquationContainerOpen.subscribe((elmStringBool:string)=> {
        });

        this.app.ports.closePage.subscribe((elmString:string)=> {
            var parentNode = this.shadowDom.parentNode;
            if(parentNode != null){
                parentNode.removeChild(this.shadowDom);
            }
        });

        this.app.ports.downloadImage.subscribe((elmJsonString:string)=>{
            var elmObject = new ElmPort(elmJsonString);
            let divImage =  document.getElementById("DisplayEquation");
            if(this.offScreenItemIframe.contentWindow != null && divImage != null){
                this.offScreenItemIframe.contentWindow.postMessage({"imageType": ImageTypesEnum.Png,
                                                                    "imageSize": elmObject.mathEquationFontSize,
                                                                    "color": elmObject.mathEquationColor,
                                                                    "EquationHtml": divImage.innerHTML,
                                                                    "downloadImage":true},"*") 
            }
        });
        /**********************setting-elm-up************************************/
        
        //wait untill elm load to load the clipboard element

        //This uses the older clipboard events that support on all browsers
        //Newer one support in chrome 66-
        //https://medium.com/@harrisrobin/an-introduction-to-the-new-async-clipboard-api-7e6567685a05
        setTimeout(()=>{

            var submitButton = document.getElementById("NavSubmitButton")
            var resizeIcon = document.getElementById("ResizeIcon");
            var EquationsContainer = document.getElementById("EquationsContainer");
            var dragImage = document.getElementById("TestDrag");

            if(submitButton == null || resizeIcon == null || EquationsContainer == null || dragImage == null)
                throw("can't add event handlers becuase elms still loading");

            submitButton.onclick = ()=>{
                document.execCommand("cut");
                //document.execCommand("copy");
                console.log("going to cut Button");
            }
            
            dragImage.draggable = true;
            dragImage.ondragstart = (ev)=>{
                console.log("started to drag image");
                var testImage = <HTMLImageElement>document.createElement("img"); 
                testImage.src = this.pngBase64Image;
                
                
                //set tmp image 
                ev.dataTransfer.setDragImage(testImage,10,10);

                //this works in chrome
                //ev.dataTransfer.setData("text/html",'<img id="CanvasImg" src="'+ this.pngBase64Image +'">');
                ev.dataTransfer.setData("text/html", "Hello there, <strong>stranger</strong>");
                ev.dataTransfer.setData("text/plain", "Hello there, stranger");

            }
            /*
            For some reason copy doesn't work on firefox
            */
            document.addEventListener("cut", (event:ClipboardEvent)=>{
                event.preventDefault();
                console.log("started copying 1");
                
                if (event.clipboardData) {
                    if(this.pngBase64Image != ""){
                        console.log("setting the clipboard")
                        event.clipboardData.setData('text/html', '<meta http-equiv="content-type" content="text/html; charset=utf-8"><img id="CanvasImg" src="'+ this.pngBase64Image +'">');
                    }
                }
                else{
                    throw("your browser does not support clipboardData.")
                }
            });

            resizeIcon.addEventListener("touchstart", (event)=>{

                let sourceElement = event.srcElement;
                if (sourceElement == null)
                    throw "no source element"

                let touchMoveFunc = (event:TouchEvent)=>{
                    event.preventDefault();
                }
                let touchEndFunc = (event:TouchEvent)=>{
                    let sourceElement = event.srcElement;
                    if (sourceElement == null)
                        throw "no source element"
                    sourceElement.removeEventListener("touchmove", touchMoveFunc, false);
                    sourceElement.removeEventListener("touchend", touchEndFunc, false);
                    event.preventDefault();
                }
                sourceElement.addEventListener("touchmove",touchMoveFunc)
                //<HACK> to allow the options in addEventListener
                //https://stackoverflow.com/questions/46844639/addeventlistener-error-with-options-in-typescript
                sourceElement.addEventListener("touchend", touchEndFunc,<any>{"once": true});
                event.preventDefault();
            });
            
            var moveHeight = function(event:MouseEvent){
                //console.log("mouse moved")
                var height = event.clientY;
                if(EquationsContainer != null){
                    EquationsContainer.style.top = height + "px";
                    EquationsContainer.style.transitionDuration = "0s";
                }
                
            }

            var removeEventListeners = function(event:MouseEvent){
                //console.log("removed")
                document.removeEventListener("mousemove",moveHeight,false);
                if(EquationsContainer != null){
                    EquationsContainer.style.transitionDuration = "0.5s";
                }
            }

            resizeIcon.addEventListener("mousedown", (event)=>{
                document.addEventListener("mousemove",moveHeight);
                document.addEventListener("mouseup", removeEventListeners,<any>{"once": true}); //,<any>{"once": true}
                event.preventDefault();
            });

            
            
            
        },1000)

    }


}
