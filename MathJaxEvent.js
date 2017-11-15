

class MathEquationAnywhere extends HTMLElement{
    static get observedAttributes(){
        return ["baseurl"]
    }
    constructor(){
        super()
        const shadowRoot = this.attachShadow({mode: 'open'});
        this.container = document.createElement("div");
        this.container.id = "MathEquationContainer";
        this.container.style.width = "100%";
        this.container.style.position = "fixed"
        this.container.style.bottom = "0"
        this.container.style.left = "0"
        this.container.style.background = "white";
        this.container.style.zIndex = "2000"

        /*~~~~~~~~~~~~~~~~~elm~css~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        this.shadowStyle = document.createElement('link');
        this.shadowStyle.rel = 'stylesheet';
        this.shadowStyle.type = 'text/css';
        //this.shadowStyle.href = chrome.extension.getURL('StyleSheets/MyCss.css');
        /*~~~~~~~~~~~~~~~~~elm~css~~~~~~~~~~~~~~~~~~~~~~~~~~*/

        /*~~~~~~~~~~~~~~~~~MathJax~CDN~~~~~~~~~~~~~~~~~~~~~~*/
        this.mathJax = document.createElement('script');
        this.mathJax.src ="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js" 
        this.mathJax.async = true
        /*~~~~~~~~~~~~~~~~~MathJax~CDN~~~~~~~~~~~~~~~~~~~~~~*/

        /*~~~~~~~~~~~~~~~~~MathJaxConfig~~~~~~~~~~~~~~~~~*/
        this.mathJaxConfig = document.createElement('script');
        this.mathJaxConfig.type = "text/x-mathjax-config";
        //remove the newlines
        //https://www.textfixer.com/tools/remove-line-breaks.php
        this.mathJaxConfig.innerHTML = "MathJax.Hub.Config( { jax: ['input/TeX','input/MathML','input/AsciiMath','output/SVG'], extensions: ['tex2jax.js','mml2jax.js','MathEvents.js','asciimath2jax.js','MathZoom.js','AssistiveMML.js'], MathML: { extensions: ['content-mathml.js'] }, TeX: { Macros: { RR: '{\\bf R}', bold: ['{\\bf #1}', 1] } }, tex2jax: { inlineMath: [['$','$'], ['\\(','\\)']], processEscapes: true }, AsciiMath: { fixphi: true, useMathMLspacing: true, displaystyle: false, decimalsign: '.' }, SVG: { mtextFontInherit: true, blacker: 1, linebreaks: { automatic: true }, useFontCache: false }, menuSettings: { zoom: 'Click' }, MatchWebFonts: { matchFor: { SVG: {useFontCache: false} }, fontCheckDelay: 500, fontCheckTimeout: 15 * 1000 }, messageStyle: 'none' } ); console.log('loaded config');";
        /*~~~~~~~~~~~~~~~~~MathJaxConfig~~~~~~~~~~~~~~~~~*/



        /*~~~~~~~~~~~~~~~~~Clipboard~~~~~~~~~~~~~~~~~~~~~*/
        this.clipboard = document.createElement('script');
        this.clipboard.onload = function(){
            new Clipboard("#NavSubmitButton")
            var submitButton = this.shadowRoot.getElementById("NavSubmitButton")
            submitButton.setAttribute("data-clipboard-action", "copy");
        }.bind(this);
        /*~~~~~~~~~~~~~~~~~Clipboard~~~~~~~~~~~~~~~~~~~~~*/

        /*~~~~~~~~~~~~~~~~~Ports~~~~~~~~~~~~~~~~~~~~~*/
        this.portsJS = document.createElement('script');
        /*~~~~~~~~~~~~~~~~~Ports~~~~~~~~~~~~~~~~~~~~~*/



        /*elm */
        this.elmCode = document.createElement('script');
        this.elmCode.onload = function(){
            console.log("elm")
            this.app = Elm.Main.embed(this.container,{
                "baseUrl": this.getAttribute("baseurl")
            });
            this.shadowRoot.appendChild(this.clipboard);
            this.portsJS.onload = function(){
                console.log("this")
                console.log(this)
                portJsCode.bind(this)();
            }.bind(this)
            this.shadowRoot.appendChild(this.portsJS);
        }.bind(this)
        /**elm */


    }
    connectedCallback(){
        this.shadowRoot.appendChild(this.container);
        document.body.appendChild(this.mathJaxConfig);
        document.body.appendChild(this.mathJax);
        //this.shadowRoot.appendChild(this.mathJaxConfig);
        //this.shadowRoot.appendChild(this.mathJax);
        var event = new CustomEvent('MathEquationAdded');
        document.dispatchEvent(event);
    }
    //disconnectedCallback(){}
    attributeChangedCallback(attr,oldValue,newValue){
        if(attr == "baseurl"){
            console.log("baseUrlChagned")
            this.shadowStyle.href = newValue + "StyleSheets/MyCss.css";
            this.shadowRoot.appendChild(this.shadowStyle);
            this.elmCode.src = newValue + "main.js";
            this.shadowRoot.appendChild(this.elmCode);
            this.clipboard.src = newValue + "clipboard.min.js";
            this.portsJS.src = newValue + "ports.js"
        }
    }
}

window.customElements.define('math-equation-anywhere', MathEquationAnywhere)