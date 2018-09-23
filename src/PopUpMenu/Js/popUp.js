/*
opera doesn't not support
browser.storage.sync
so i'll probably have to do 
if(browser.storage.sync == null)
browser.storage.sync  = browser.storage.local
or something
https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
*/

var browser = browser || chrome;
/*
document.addEventListener('DOMContentLoaded', function() {
  browser.storage.sync.get(["fontStyles"], function (result) {
    var fontContainer = document.getElementById("selectedFont");
    var defaultFont = fontContainer.value;
    if(result["fontStyles"] == undefined || result["fontStyles"] == null)
      result["fontStyles"] = defaultFont;
    fontContainer.value = result["fontStyles"]
    selectImage(result["fontStyles"]);
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {openMenu: result});
    });
  });
}.bind(this));



var selectImage = function(imgName){
  var imgExampleFont = document.getElementById("imgExampleFontSelected");
  imgExampleFont.src = "/Img/" + imgName +".svg"
}

var onSelectFont = function(){
  browser.storage.sync.set({"fontStyles": this.value}, function() {
  });
  selectImage(this.value);
}
var resetUI = function(){
  browser.storage.sync.get(["fontStyles"], function (result) {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {resetUI: result});
    });
  });
}

document.getElementById("selectedFont").addEventListener("change", onSelectFont);
document.getElementById("resetUIButton").addEventListener("click", resetUI);
*/