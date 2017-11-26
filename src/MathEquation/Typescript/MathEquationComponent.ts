import { CustomElement, OnConnected, OnDisconnected, OnAttributeChanged } from './custom-elements.ts';
import { ElmPort } from './ElmPort.ts'
import { MathJaxConvert } from './MathJaxConvert.ts'
import { MathTypes,ConvertMathTypes } from './MathTypes.ts'
import { PostMessageHandler } from './PostMessageHandler.ts'
import { ImageTypesEnum} from './ImageTypes.ts'
import { CanvasToImage } from './CanvasToImage.ts'
import { setTimeout } from 'timers';

var Elm :any = require('../Elm/Main.elm');

@CustomElement({
    tagName: 'math-equation-anywhere',
    //options:{
    //    extends: "div"
    //}
})
class MathEquationAnywhere extends HTMLElement implements OnAttributeChanged, OnConnected, OnDisconnected {
    container: HTMLElement;
    app:any;
    mathJaxConvert = new MathJaxConvert();
    postMessageHandler: PostMessageHandler;
    canvasToImage = new CanvasToImage();

    color: string = "#000000";
    mathType: MathTypes = MathTypes.NoMathType;
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        this.container = document.createElement("div");
        this.container.id = "MathEquationContainer";
        this.container.style.width = "100%";
        this.container.style.position = "fixed"
        this.container.style.bottom = "0"
        this.container.style.left = "0"
        this.container.style.background = "white";
        this.container.style.zIndex = "2000"

    }
    static get observedAttributes(){
        return [MathCompAttributes.baseurl,
                MathCompAttributes.color,
                MathCompAttributes.mathtype,
                MathCompAttributes.origin]
    }
    connectedCallback() {
        console.log("connected Callback")
        document.body.appendChild(this.container);
        var event = new CustomEvent('MathEquationAdded');
        document.dispatchEvent(event);
        var origin = this.getAttribute("originurl");
        if(origin == null)
            throw("didn't get origin url");
        this.postMessageHandler = new PostMessageHandler(origin);

        /**********************setting-elm-up************************************/
        this.app = Elm.Main.embed(this.container,{
            "baseUrl": this.getAttribute("baseurl")
        });

        this.app.ports.updateEquation.subscribe((elmJsonString:string)=> {
            var elmObject = new ElmPort(elmJsonString);
            
            if(this.color !== elmObject.mathEquationColor)
                this.setAttribute(MathCompAttributes.color,elmObject.mathEquationColor)
            if(this.mathType !== elmObject.selectedMathType)
                this.setAttribute(MathCompAttributes.mathtype,elmObject.selectedMathType)

            this.mathJaxConvert.queueEquation(elmObject);
            this.postMessageHandler.MinimizeTextInput(false);
        });

        this.app.ports.setEquationContainerOpen.subscribe((elmStringBool:string)=> {
            if(elmStringBool == "true" || elmStringBool == "True"){             
                this.postMessageHandler.MinimizeTextInput(true);
            }
            else{
                this.postMessageHandler.MinimizeTextInput(false);
            }
        });

        this.app.ports.closePage.subscribe((elmString:string)=> {
            this.postMessageHandler.closeMenu();
        });

        this.app.ports.downloadImage.subscribe((elmJsonString:string)=>{
            var elmObject = new ElmPort(elmJsonString);
            this.canvasToImage.downloadImage(elmObject.GetMathEquationId(),elmObject.downloadImageType, elmObject.mathEquationColor);

        });
        /**********************setting-elm-up************************************/
        
        //wait untill elm load to load the clipboard element
        setTimeout(()=>{

            var submitButton = document.getElementById("NavSubmitButton")
            var resizeIcon = document.getElementById("ResizeIcon");
            if(submitButton == null || resizeIcon == null)
                throw("can't add event handlers becuase elms still loading");

            submitButton.onclick = function(){
                document.execCommand("copy");
            }
            document.addEventListener("copy", (event:ClipboardEvent)=>{
                event.preventDefault();

                
                if (event.clipboardData) {
                    var png64 = this.canvasToImage.convertSvg(this.mathType + "Equation", this.color)
                    event.clipboardData.setData('text/html', '<meta http-equiv="content-type" content="text/html; charset=utf-8"><img id="CanvasImg" src="'+ png64 +'">');
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
                    this.postMessageHandler.mouseResize(event.changedTouches[0].clientY);
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
            
            resizeIcon.addEventListener("mousedown", (event)=>{
                this.postMessageHandler.enableMouseResize();
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
                case MathCompAttributes.baseurl:
                    
                    break;
                case MathCompAttributes.color:
                    this.color = newVal;
                    break;
                case MathCompAttributes.mathtype:
                    this.mathType =  ConvertMathTypes(newVal);
                    break;
                case MathCompAttributes.origin:
                    break;
    
            }
        }

    }
}


const enum MathCompAttributes {
    baseurl = "baseurl",
    color = "equationcolor",
    mathtype = "mathtype",
    origin = "origin"
}