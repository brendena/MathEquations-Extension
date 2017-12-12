var mathEquationEditorId = "MathEquationElement";
var constructUi = function(configOptions){
    console.log("constructing ui")
    


    var MathEquationTag = document.createElement("math-equation-anywhere");
    MathEquationTag.id = mathEquationEditorId
    MathEquationTag.setAttribute("baseurl", chrome.extension.getURL(""));
    MathEquationTag.setAttribute("originurl", window.location.href);
    
    /*veryMuchHack*/
        /*orgin is know added in the web component itself */
        /*
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
        document.head.appendChild(scriptTag)
    }

    addScript("mathEquationComponent");
    addScript('webcomponents-loader');

    document.body.appendChild(MathEquationTag)
}





var runtimeFunction = function(request, sender) {
    console.log(request)
    var mathEquationEditor = document.getElementById(mathEquationEditorId);
	if(request.hasOwnProperty('openMenu')){
        if(mathEquationEditor == undefined || mathEquationEditor == null){
            if (document.readyState != 'complete'){
                window.addEventListener("load",constructUi);
            }
            else{
                constructUi(request["openMenu"]);
            }
        }
    }
    else if(request.hasOwnProperty('resetUI')){
        if(mathEquationEditor != undefined || mathEquationEditor != null){
            mathEquationEditor.parentNode.removeChild(mathEquationEditor);
        }
        constructUi(request["resetUI"]);
    };
}



chrome.runtime.onMessage.addListener(
	runtimeFunction
);

constructUi();