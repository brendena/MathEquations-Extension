/*
import { CustomElement, OnConnected, OnDisconnected, OnAttributeChanged } from './custom-elements.ts';
import { ElmPort } from './ElmPort.ts'
import { MathTypes,ConvertMathTypes } from './MathTypes.ts'
import { PostMessageHandler } from './PostMessageHandler.ts'
import { ImageTypesEnum} from './ImageTypes.ts'
import { Html2CanvasHelper } from './Html2CanvasHelper.ts'
import { setTimeout } from 'timers';


const katex : any = require('katex');
const Elm : any = require('../Elm/Main.elm');

//declare var katex: any;
@CustomElement({
    tagName: 'math-equation-anywhere',
    //options:{
    //    extends: "div"
    //}
})
class MathEquationAnywhere extends HTMLElement implements OnAttributeChanged, OnConnected, OnDisconnected {
    private shadowDom : ShadowRoot;
    container: HTMLDivElement;
    slotLightDom : HTMLElement;
    tmpImageContainer: HTMLDivElement;
    offScreenItemDiv: HTMLElement;

    app:any;
    postMessageHandler: PostMessageHandler;
    html2CanvasHelper = new Html2CanvasHelper();
    createBase64ImageTimerId : number = -1 ;
    pngBase64Image : string = "";
    baseUrl: string;


    
    color: string = "#000000";
    mathType: MathTypes = MathTypes.NoMathType;
    constructor(){
        super();

        this.shadowDom = this.attachShadow({mode: 'closed'});

        this.container = document.createElement("div");
        this.container.id = "MathEquationContainer";
        this.container.style.width = "100%";
        this.container.style.position = "fixed"
        this.container.style.bottom = "0"
        this.container.style.left = "0"
        this.container.style.background = "white";
        this.container.style.zIndex = "500000"
        this.shadowDom.appendChild(this.container);
        
        
        this.slotLightDom = document.createElement("div");
        this.slotLightDom.id = "mathEquationSlotLightDom";
        this.slotLightDom.style.flex = "1";
        this.slotLightDom.style.padding = "20px";
        this.slotLightDom.style.paddingBottom = "0px";
        this.slotLightDom.style.display = "flex";
        this.slotLightDom.setAttribute("slot","EquationDisplay"); 
        this.appendChild(this.slotLightDom); 

       


        
    }
    static get observedAttributes(){
        return [MathCompAttributes.baseurl,
                MathCompAttributes.color,
                MathCompAttributes.mathtype]
    }
    connectedCallback() {
        var event = new CustomEvent('MathEquationAdded');
        document.dispatchEvent(event);
        
        //load certain items off screen on the actuall dom.
        //This pervents them from being slotted into the main program
        //which is needed for the html rendering library.

        this.offScreenItemDiv = document.createElement("div");
        this.offScreenItemDiv.id = "MathEquationsOffscreenItems";
        document.body.appendChild(this.offScreenItemDiv);

        this.tmpImageContainer = document.createElement("div");
        this.tmpImageContainer.id = "tmpImageContainer";
        this.tmpImageContainer.style.position = "fixed";
        this.tmpImageContainer.style.left = "-100%";
        this.tmpImageContainer.style.top = "-100%";
        this.offScreenItemDiv.appendChild(this.tmpImageContainer); 

        let styleLinkKatex = document.createElement("link");
        styleLinkKatex.href = this.getAttribute("baseurl") + "katex.min.css" 
        styleLinkKatex.rel = "stylesheet";
        styleLinkKatex.type = "text/css";
        this.offScreenItemDiv.appendChild(styleLinkKatex);


        //load in css code

        let script = document.createElement("script");
        script.src = this.getAttribute("baseurl") + "mathEquationComponentOnload.js"
        this.shadowDom.appendChild(script);
        
        let styleLinkElm = document.createElement("link");
        styleLinkElm.href = this.getAttribute("baseurl") + "css/mathEquationComponentElm.css" 
        styleLinkElm.rel = "stylesheet";
        styleLinkElm.type = "text/css";
        this.shadowDom.appendChild(styleLinkElm);




        //**********************setting-elm-up************************************
        this.app = Elm.Main.embed(this.container,{
            "baseUrl": this.getAttribute("baseurl")
        });

        this.app.ports.updateEquation.subscribe((elmJsonString:string)=> {
            var elmObject = new ElmPort(elmJsonString);
            
            if(this.color !== elmObject.mathEquationColor)
                this.setAttribute(MathCompAttributes.color,elmObject.mathEquationColor)
            if(this.mathType !== elmObject.selectedMathType)
                this.setAttribute(MathCompAttributes.mathtype,elmObject.selectedMathType)

            try{
                katex.render(elmObject.mathEquation, document.getElementById("mathEquationSlotLightDom"));
                window.clearTimeout(this.createBase64ImageTimerId);
                this.createBase64ImageTimerId = window.setTimeout(() => {
                    this.html2CanvasHelper.downloadImagePromise(ImageTypesEnum.Png, elmObject.mathEquationFontSize, this.color).then((canvasData :any)=>{
                        console.log(canvasData)
                        this.pngBase64Image = canvasData;
                    }).catch((error:any)=>{
                        console.error(error);
                        console.error("failed to get image")
                    });
                }, 500);
            }
            catch(errorCantConvertEquation){
                console.error(errorCantConvertEquation);
            }
        });

        this.app.ports.setEquationContainerOpen.subscribe((elmStringBool:string)=> {
        });

        this.app.ports.closePage.subscribe((elmString:string)=> {
            var parentNode = this.parentNode;
            if(parentNode != null){
                parentNode.removeChild(this);
            }
        });

        this.app.ports.downloadImage.subscribe((elmJsonString:string)=>{
            var elmObject = new ElmPort(elmJsonString);
            console.log("download iamge")
            //this.canvasToImage.downloadImage(elmObject.GetMathEquationId(),elmObject.downloadImageType, elmObject.mathEquationColor);
            this.html2CanvasHelper.downloadImagePromise(elmObject.downloadImageType, elmObject.mathEquationFontSize, elmObject.mathEquationColor).then((dataImage:string)=>{
                var downloadButton = this.shadowDom.getElementById("DownloadButton");
                if(downloadButton != null){
                    downloadButton.setAttribute("href", dataImage);
                }
            });
        });
        //**********************setting-elm-up************************************
        
        //wait untill elm load to load the clipboard element

        //This uses the older clipboard events that support on all browsers
        //Newer one support in chrome 66-
        //https://medium.com/@harrisrobin/an-introduction-to-the-new-async-clipboard-api-7e6567685a05
        setTimeout(()=>{

            var submitButton = this.shadowDom.getElementById("NavSubmitButton")
            var resizeIcon = this.shadowDom.getElementById("ResizeIcon");
            var EquationsContainer = this.shadowDom.getElementById("EquationsContainer");
            var dragImage = this.shadowDom.getElementById("TestDrag");

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

                //set the data of drag and drop
                var wrapper = document.createElement("div");
                wrapper.appendChild(testImage);
                ev.dataTransfer.setData("text/html",wrapper.innerHTML);
                
            }
            
            //For some reason copy doesn't work on firefox
            
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
                    //this.postMessageHandler.mouseResize(event.changedTouches[0].clientY);
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

    disconnectedCallback() {

    }
    attributeChangedCallback(attrName?: string, oldVal?: string, newVal?: string){
        //console.log("attributeChange");
        //console.log(newVal)
        if(newVal != null || newVal != undefined){
            switch(attrName){
                case MathCompAttributes.color:
                    this.color = newVal;
                    break;
                case MathCompAttributes.mathtype:
                    this.mathType =  ConvertMathTypes(newVal);
                    break;
            }
        }
    }

    updateCopyImageBase(){

    }
}


const enum MathCompAttributes {
    baseurl = "baseurl",
    color = "equationcolor",
    mathtype = "mathtype"
}
*/