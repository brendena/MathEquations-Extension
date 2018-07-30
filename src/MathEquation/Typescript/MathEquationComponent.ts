import { CustomElement, OnConnected, OnDisconnected, OnAttributeChanged } from './custom-elements.ts';
import { ElmPort } from './ElmPort.ts'
import { MathTypes,ConvertMathTypes } from './MathTypes.ts'
import { PostMessageHandler } from './PostMessageHandler.ts'
import { ImageTypesEnum} from './ImageTypes.ts'
import { CanvasToImage } from './CanvasToImage.ts'
import { setTimeout } from 'timers';

const katex: any = require('katex');
const html2canvas: any = require('../../../lib/html2canvas.min.js');
const Elm :any = require('../Elm/Main.elm');


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
    app:any;
    postMessageHandler: PostMessageHandler;
    canvasToImage = new CanvasToImage();
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

;

        
    }
    static get observedAttributes(){
        return [MathCompAttributes.baseurl,
                MathCompAttributes.color,
                MathCompAttributes.mathtype]
    }
    connectedCallback() {
        console.log("connected Callback")

        var event = new CustomEvent('MathEquationAdded');
        document.dispatchEvent(event);
        var origin = this.getAttribute("originurl");

        let script = document.createElement("script");
        script.src = this.getAttribute("baseurl") + "mathEquationComponentOnload.js"
        
        this.shadowDom.appendChild(script);
        
        script.addEventListener("load", function(){
            console.log("testtest");
            console.log(katex);
            console.log(html2canvas)
        });


        let styleLinkElm = document.createElement("link");
        styleLinkElm.href = this.getAttribute("baseurl") + "css/mathEquationComponentElm.css" 
        styleLinkElm.rel = "stylesheet";
        styleLinkElm.type = "text/css";
        this.shadowDom.appendChild(styleLinkElm);


        let styleLink = document.createElement("link");
        styleLink.href = this.getAttribute("baseurl") + "css/mathEquationComponent.css" 
        styleLink.rel = "stylesheet";
        styleLink.type = "text/css";
        this.shadowDom.appendChild(styleLink);


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

            try{
                katex.render(elmObject.mathEquation, this.shadowDom.getElementById("SvgContainer"));
            }
            catch(errorCantConvertEquation){
                console.log(errorCantConvertEquation);
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
            this.canvasToImage.downloadImage(elmObject.GetMathEquationId(),elmObject.downloadImageType, elmObject.mathEquationColor);

        });
        /**********************setting-elm-up************************************/
        
        //wait untill elm load to load the clipboard element
        setTimeout(()=>{

            var submitButton = this.shadowDom.getElementById("NavSubmitButton")
            var resizeIcon = this.shadowDom.getElementById("ResizeIcon");
            var EquationsContainer = this.shadowDom.getElementById("EquationsContainer");
            if(submitButton == null || resizeIcon == null || EquationsContainer == null)
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
}


const enum MathCompAttributes {
    baseurl = "baseurl",
    color = "equationcolor",
    mathtype = "mathtype"
}