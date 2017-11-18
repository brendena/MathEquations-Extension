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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var contentJS = __webpack_require__(19);

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

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

/***/ })

/******/ });