'use strict'
//this will become the IframeMessageHandler script

import { Html2CanvasHelper } from './MathEquation/Typescript/Html2CanvasHelper.ts'

var baseUrl = "";
var html2CanvasHelper = new Html2CanvasHelper();

var tmpImageContainer = document.createElement("div");
tmpImageContainer.id = "tmpImageContainer";
document.body.appendChild(tmpImageContainer);


window.onmessage = function(event){
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
                    
                    var downloadImage = false;
                    if(messageData["downloadImage"] != null){
                        downloadImage = true;
                    }
                    parent.postMessage({"imageType":messageData["imageType"],
                                        "returnImage":returnImageData,
                                        "downloadImage":downloadImage},"*");

                }).catch(function(error){
                    console.error(error)
                });
            }
        }
    }
};