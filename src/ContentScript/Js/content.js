console.log("got content.js")
var constructUi = function(){
    var iframe = document.createElement("iframe")
    iframe.id="mathEquationIframe";
    iframe.style.position = "fixed"
    iframe.style.bottom = "0";
    iframe.style.left = "0";
    iframe.style.zIndex = "4000";
    iframe.style.border = "0";
    iframe.style.width = "100%";
    iframe.style.height = "300px";
    iframe.allowtransparency="true";
    iframe.style.maxHeight = "80%";
    iframe.style.minHeight = "100px";
    
    setTimeout(function(){
        iframe = document.getElementById("mathEquationIframe");
        
        
        var MathEquationTag = document.createElement("math-equation-anywhere");
        MathEquationTag.id ="MathEquationElement"
        MathEquationTag.setAttribute("baseurl", chrome.extension.getURL(""));
        MathEquationTag.setAttribute("originurl", window.location.href);
        iframe.contentDocument.body.appendChild(MathEquationTag)
    
        /*veryMuchHack*/
            /*orgin is know added in the web component itself */
            window.addEventListener("message", function(event){
                var height = iframe.style.height;
                iframe.style.height = (parseInt(height, 10) - event.data) + "px";
                //console.log(iframe.style.height)

            }, false);
        /*veryMuchHack*/
        
        var addScript = function(scriptName){
            var scriptTag = document.createElement('script');
            scriptTag.src = chrome.extension.getURL(scriptName + ".js")
            //document.body.appendChild(scriptTag);
            iframe.contentDocument.head.appendChild(scriptTag)
        }
        addScript("mathEquationComponent");
        /*need to loader the webcomponets-loader here because this code uses the url
        to load other files.*/
        addScript('webcomponents-loader');
    },100);
    console.log(iframe)
    document.body.appendChild(iframe)
}






var called = false
var runtimeFunction = function(request, sender) {
	if(request.hasOwnProperty('openMenu')){
        console.log("got call");
        if(called == false){
            constructUi();
            called = true;
        }
	}
}



chrome.runtime.onMessage.addListener(
	runtimeFunction
);