
document.addEventListener('DOMContentLoaded', () => {
  console.log("dom loaded")
  chrome.tabs.executeScript(null, {file: "main.js"},function(){
    //content need main.js because it has the elm code
    // content.js append that to the body of the directory
    chrome.tabs.executeScript(null, {file: "content.js"}, function(){
      chrome.tabs.executeScript(null, {file: "clipboard.min.js"}, function(){
        //ports uses clipboard to make the image selection
        //ports needs Elm to add the top so that it can 
        //add the clipboard elements 
        chrome.tabs.executeScript(null, {file: "ports.js"});
      });
    });
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