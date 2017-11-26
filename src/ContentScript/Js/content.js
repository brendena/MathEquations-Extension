var iframeId = "mathEquationIframe";
var constructUi = function(configOptions){
    console.log("constructing ui")
    var iframe = document.createElement("iframe")
    iframe.id= iframeId;
    iframe.allowtransparency="true";
    
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
                            //console.log("testing")
                            iframe.style.pointerEvents = 'none';
                            var moveHeight = function(event){
                                //console.log("mouse moved")
                                var height = document.body.clientHeight - event.clientY;
                                iframe.style.height = height + "px";
                            }
                            var removeEventListeners = function(event){
                                //console.log("removed")
                                document.removeEventListener("mousemove",moveHeight,false);
                                document.removeEventListener("mouseup", removeEventListener,false);
                                iframe.style.pointerEvents = 'initial';
                            }
                            document.addEventListener("mousemove",moveHeight);

                            document.addEventListener("mouseup", removeEventListeners,{"once": true}); //,<any>{"once": true}
                            break;

                    }
                }

            }, false);
            
            //https://www.gyrocode.com/articles/how-to-detect-mousemove-event-over-iframe-element/
            


        /*veryMuchHack*/
        
        var addScript = function(scriptName){
            let scriptTag = document.createElement('script');
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
    console.log(request)
    var iframe = document.getElementById(iframeId);
	if(request.hasOwnProperty('openMenu')){
        if(iframe == undefined || iframe == null){
            if (document.readyState != 'complete'){
                window.addEventListener("load",constructUi);
            }
            else{
                constructUi(request["openMenu"]);
            }
        }
    }
    else if(request.hasOwnProperty('resetUI')){
        if(iframe != undefined || iframe != null){
            iframe.parentNode.removeChild(iframe);
        }
        constructUi(request["resetUI"]);
    };
}



chrome.runtime.onMessage.addListener(
	runtimeFunction
);

//constructUi({"fontStyles":"STIX-Web"});