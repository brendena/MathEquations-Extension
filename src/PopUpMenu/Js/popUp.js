document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(["fontStyles"], function (result) {
    var fontContainer = document.getElementById("selectedFont");
    var defaultFont = fontContainer.value;
    if(result["fontStyles"] == undefined || result["fontStyles"] == null)
      result["fontStyles"] = defaultFont;
    fontContainer.value = result["fontStyles"]
    selectImage(result["fontStyles"]);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {openMenu: result});
    });
  });
}.bind(this));

chrome.browserAction.onClicked.addListener(function(tab) {

});

var selectImage = function(imgName){
  var imgExampleFont = document.getElementById("imgExampleFontSelected");
  imgExampleFont.src = "/Img/" + imgName +".svg"
}

var onSelectFont = function(){
  chrome.storage.sync.set({"fontStyles": this.value}, function() {
  });
  selectImage(this.value);
}
var resetUI = function(){
  chrome.storage.sync.get(["fontStyles"], function (result) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {resetUI: result});
    });
  });
}

document.getElementById("selectedFont").addEventListener("change", onSelectFont);
document.getElementById("resetUIButton").addEventListener("click", resetUI);