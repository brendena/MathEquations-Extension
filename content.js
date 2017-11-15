console.log("base url");
console.log(chrome.extension.getURL(""))

document.addEventListener('build', function (e) { 
    console.log("got the message")

});




var iframe = document.createElement("iframe")
iframe.id="test";
iframe.style.position = "fixed"
iframe.style.bottom = "0";
iframe.style.left = "0";
iframe.style.zIndex = "4000";
iframe.style.border = "0";
iframe.style.width = "100%";
iframe.style.height = "300px";
iframe.allowtransparency="true"


setTimeout(function(){
    iframe = document.getElementById("test");
    var MathEquationTag = document.createElement("math-equation-anywhere");
    MathEquationTag.id ="MathEquationElement"
    MathEquationTag.setAttribute("baseurl", chrome.extension.getURL(""));
    iframe.contentDocument.body.appendChild(MathEquationTag)
    /*veryMuchHack*/
        

        var originTextTag = document.createElement("p");
        originTextTag.style.display = "none";
        originTextTag.innerHTML = window.location.href;
        originTextTag.id = "originText"
        iframe.contentDocument.body.appendChild(originTextTag);
        
        window.addEventListener("message", function(event){
            var height = iframe.style.height;
            iframe.style.height = (parseInt(height, 10) - event.data) + "px";
        }, false);
    /*veryMuchHack*/
    
    
    var addScript = function(scriptName){
        var scriptTag = document.createElement('script');
        scriptTag.src = chrome.extension.getURL("MathJaxEvent" + ".js")
        //document.body.appendChild(scriptTag);
        iframe.contentDocument.body.appendChild(scriptTag)
    }
    
    addScript("MathJaxEvent")
},1000);



document.body.appendChild(iframe)