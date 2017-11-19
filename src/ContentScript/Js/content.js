console.log("got content.js")
var iframeId = "mathEquationIframe";
var constructUi = function(configOptions){
    var iframe = document.createElement("iframe")
    iframe.id= iframeId;
    iframe.style.position = "fixed"
    iframe.style.bottom = "0";
    iframe.style.left = "0";
    iframe.style.zIndex = "4000";
    iframe.style.border = "0";
    iframe.style.width = "100%";
    iframe.style.height = "300px";
    iframe.allowtransparency="true";
    iframe.style.maxHeight = "80%";
    //iframe.style.minHeight = "100px";
    
    setTimeout(function(){
        iframe = document.getElementById("mathEquationIframe");
        
        
        var MathEquationTag = document.createElement("math-equation-anywhere");
        MathEquationTag.id = "MathEquationElement"
        MathEquationTag.setAttribute("baseurl", chrome.extension.getURL(""));
        MathEquationTag.setAttribute("originurl", window.location.href);
        iframe.contentDocument.body.appendChild(MathEquationTag)
        
        /*veryMuchHack*/
            /*orgin is know added in the web component itself */
            var timeOut = 500;
            var lastPositionY = undefined;
            var minPositionY = 100;
            window.addEventListener("message", function(event){
                let messageData = event.data 
                console.log(messageData)
                if(messageData != undefined && messageData["messageType"] != undefined){
                    switch (messageData["messageType"]){
                        case "MouseResize":
                            var height = iframe.style.height;
                            var positionY = (parseInt(height, 10) - messageData.value);
                            if (positionY >= minPositionY){
                                lastPositionY = positionY;
                                iframe.style.height = lastPositionY + "px";
                            }
                            break;
                        case "CloseMenu":
                            console.log("close")
                            if (iframe.parentNode) {
                                iframe.parentNode.removeChild(iframe);
                            }
                            break;
                        case "MinimizeTextInput":
                            if(messageData.value == true){
                                setTimeout(function(){iframe.style.height =  "100px";},timeOut);
                            }
                            else{
                                if(lastPositionY != undefined)
                                    iframe.style.height =  lastPositionY + "px";;
                            }
                            break;
                    }
                }

            }, false);
        /*veryMuchHack*/
        
        var addScript = function(scriptName){
            var scriptTag = document.createElement('script');
            scriptTag.src = chrome.extension.getURL(scriptName + ".js")
            return iframe.contentDocument.head.appendChild(scriptTag)
        }
        var mathEuationComponent = addScript("mathEquationComponent");
        mathEuationComponent.setAttribute('math-jax-font', configOptions["fontStyles"])
        /*need to loader the webcomponets-loader here because this code uses the url
        to load other files.*/
        addScript('webcomponents-loader');
    },100);
    console.log(iframe)
    document.body.appendChild(iframe)
}







var runtimeFunction = function(request, sender) {
    var iframe = document.getElementById(iframeId);
	if(request.hasOwnProperty('openMenu')){
        if(iframe == undefined){
            if (document.readyState != 'complete'){
                window.addEventListener("load",constructUi);
            }
            else{
                constructUi(request["openMenu"]);
            }
        }
    }
    else if(request.hasOwnProperty('resetUI')){
        if(iframe != undefined){
            iframe.parentNode.removeChild(iframe);
        }
        constructUi(request["resetUI"]);
    };
}



chrome.runtime.onMessage.addListener(
	runtimeFunction
);

//constructUi();