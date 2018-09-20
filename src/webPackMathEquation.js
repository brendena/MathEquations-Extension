'use strict'
//this will become the IframeMessageHandler script

import { Html2CanvasHelper } from './MathEquation/Typescript/Html2CanvasHelper.ts'
console.log(Html2CanvasHelper); 

var baseUrl = "";
var html2CanvasHelper = new Html2CanvasHelper();
window.onmessage = function(event){
    console.log(event)
    var messageData = event.data;
    if(messageData != undefined){
        var tmpImageContainer = document.getElementById("tmpImageContainer");
        if(messageData["imageType"] != null &&
           messageData["imageSize"] != null &&
           messageData["color"] != null &&
           messageData["EquationHtml"] != null &&
           tmpImageContainer != null){


            tmpImageContainer.innerHTML = messageData["EquationHtml"]; 
            if(tmpImageContainer.firstChild){
                html2CanvasHelper.downloadImagePromise(tmpImageContainer.firstChild,
                                                        messageData["imageType"],
                                                        messageData["imageSize"],
                                                        messageData["color"]).then(function(returnImageData){
                    console.log(returnImageData);

                    parent.postMessage({"imageType":messageData["imageType"],
                                        "returnImage":returnImageData},"*");

                }).catch(function(error){
                    console.error(error)
                });
            }
        }
    }
};