/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ({

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var contentJS = __webpack_require__(32);

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

console.log("got content.js")
var iframeId = "mathEquationIframe";
var constructUi = function(){
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
        MathEquationTag.id ="MathEquationElement"
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







var runtimeFunction = function(request, sender) {
    var iframe = document.getElementById(iframeId);
	if(request.hasOwnProperty('openMenu')){
        if(iframe == undefined){

            if (document.readyState != 'complete'){
                window.addEventListener("load",constructUi);
            }
            else{
                constructUi();
            }
        }
	}
}



chrome.runtime.onMessage.addListener(
	runtimeFunction
);

//constructUi();

/***/ })

/******/ });