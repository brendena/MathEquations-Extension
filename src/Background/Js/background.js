
var browser = browser || chrome;
console.log("loaded this extension");


//browser action 
browser.browserAction.onClicked.addListener(function(tab) {
  console.log("test")
  console.log(tab)
  browser.tabs.sendMessage(tab.id, {openCloseMenu: true});

  /*
  browser.tabs.executeScript(null,{
    file: "custom-mathjax.min.js"
  });
  browser.tabs.executeScript(null,{
    file:"contentScript.js"
  });
  */
});


//keyboard commands
browser.commands.onCommand.addListener(function(command) {
  console.log("on command whent off")  
  browser.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
    if (command == "open-close-extension") {
        browser.tabs.sendMessage(tabs[0].id, {openCloseMenu: true});
    }
    if(command == "copy-image")
    {
      console.log("copy the image");
    }
  });
});


