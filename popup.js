
document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {openMenu: true});
  }); 
});

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("test")
  /*
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
  */
});

console.log("otherTest")