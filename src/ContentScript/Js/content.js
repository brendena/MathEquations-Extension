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
            var lastPositionY = 400;
            var minPositionY = 100;
            window.addEventListener("message", function(event){
                var messageData = event.data 
                //console.log(messageData)
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
                            //console.log("close")
                            if (iframe.parentNode) {
                                iframe.parentNode.removeChild(iframe);
                            }
                            break;
                        case "MinimizeTextInput":
                            if(messageData.value == true){
                                setTimeout(function(){iframe.style.height =  "100px";},timeOut);
                            }
                            else{
                                iframe.style.height =  lastPositionY + "px";;
                            }
                            break;
                        case "EnableMouseResize":
                            iframe.style.pointerEvents = 'none';
                            console.log("enabling mouse resize")
                            var moveHeight = function(event){
                                var height = document.body.clientHeight - event.clientY;
                                iframe.style.height = height + "px";
                            }
                            var removeEventListeners = function(event){
                                console.log("removed event listeners")
                                document.removeEventListener("mousemove",moveHeight,false);
                                document.removeEventListener("mouseup", removeEventListener,false);
                                iframe.style.pointerEvents = 'initial';
                            }
                            document.addEventListener("mousemove",moveHeight,false);
                            document.addEventListener("mouseup", removeEventListeners,false);
                            break;
                    }
                }

            }, false);
            //https://www.gyrocode.com/articles/how-to-detect-mousemove-event-over-iframe-element/
            
        /*veryMuchHack*/
        
        var addScript = function(scriptName){
            var scriptTag = document.createElement('script');
            scriptTag.src = chrome.extension.getURL(scriptName + ".js")
            return iframe.contentDocument.head.appendChild(scriptTag)
        }
        var mathEuationComponent = addScript("mathEquationComponent");
        if( configOptions["fontStyles"] != undefined)
            mathEuationComponent.setAttribute('math-jax-font', configOptions["fontStyles"])
        /*need to loader the webcomponets-loader here because this code uses the url
        to load other files.*/
        addScript('webcomponents-loader');
    },100);
    document.body.appendChild(iframe)
}





var runtimeFunction = function(request, sender) {
    var iframe = document.getElementById(iframeId);
	if(request.hasOwnProperty('openMenu')){
        console.log(iframe)
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

constructUi({"fontStyles":"STIX-Web"});