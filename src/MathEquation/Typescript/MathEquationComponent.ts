import { CustomElement, OnConnected, OnDisconnected, OnAttributeChanged } from './custom-elements.ts';
import { ElmPort } from './ElmPort.ts'
import { MathJaxConvert } from './MathJaxConvert.ts'
import { MathTypes } from './MathTypes.ts'
import { PostMessageHandler } from './PostMessageHandler.ts'
import { ImageTypesEnum} from './ImageTypes.ts'
import { CanvasToImage } from './CanvasToImage.ts'
import { setTimeout } from 'timers';

var Elm :any = require('../Elm/Main.elm');
var Clipboard :any = require('../../../node_modules/clipboard/dist/clipboard.min.js')

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
        return ["baseurl"]
    }
    connectedCallback() {
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
        this.app.ports.getPageYOffset.subscribe((elmMousePositon :number)=>{
            /*code for when this is not in a iframe */
            //this.app.ports.returnBoundingClientRect.send(offsetHeight.toString());
            this.postMessageHandler.mouseResize(elmMousePositon);
        });

        this.app.ports.sumitEquation.subscribe((elmString:string)=>{
            //var elmObject = new ElmPort(elmString);
        });
        this.app.ports.updateEquation.subscribe((elmJsonString:string)=> {
            var elmObject = new ElmPort(elmJsonString);
            if(elmObject.selectedMathType != MathTypes.NoMathType){
                this.mathJaxConvert.queueEquation(elmObject);
                this.postMessageHandler.MinimizeTextInput(false);
            }
            else{
                this.postMessageHandler.MinimizeTextInput(true);
            }
        });

        this.app.ports.closePage.subscribe((elmString:string)=> {
            this.postMessageHandler.closeMenu();
        });

        this.app.ports.downloadImage.subscribe((elmJsonString:string)=>{
            var elmObject = new ElmPort(elmJsonString);
            this.canvasToImage.downloadImage(elmObject.selectedMathType + "Equation",elmObject.downloadImageType, elmObject.mathEquationColor);

        });
        /**********************setting-elm-up************************************/
        
        //wait untill elm load to load the clipboard element
        setTimeout(()=>{
            new Clipboard("#NavSubmitButton")
            var submitButton = document.getElementById("NavSubmitButton")
            if(submitButton == null)
                throw("can't add clipboard becuase elms still loading");
            submitButton.setAttribute("data-clipboard-action", "copy");
            submitButton.setAttribute("data-clipboard-target", "#CanvasImgContainer");

        },1000)

    }

    disconnectedCallback() {

    }
    attributeChangedCallback(attrName?: string, oldVal?: string, newVal?: string){
        console.log("attributeChange");
        
        if(attrName == "baseurl"){
            console.log("baseUrlChagned")
        }
    }
}
