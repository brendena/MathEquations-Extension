document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(["fontStyles"], function (result) {
    var fontContainer = document.getElementById("selectedFont");
    var defaultFont = fontContainer.value;
    if(result["fontStyles"] == undefined || result["fontStyles"] == null)
      result["fontStyles"] = defaultFont;
    fontContainer.value = result["fontStyles"]

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {openMenu: result});
    });
  });
}.bind(this));

chrome.browserAction.onClicked.addListener(function(tab) {

});


var onSelectFont = function(){
  chrome.storage.sync.set({"fontStyles": this.value}, function() {
  });
}
var resetUI = function(){
  console.log("reset the ui")
  chrome.storage.sync.get(["fontStyles"], function (result) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {resetUI: result});
    });
  });
}

document.getElementById("selectedFont").addEventListener("change", onSelectFont);
document.getElementById("resetUIButton").addEventListener("click", resetUI);