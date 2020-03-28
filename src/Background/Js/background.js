
var browser = browser || chrome;
console.log("loaded this extension");
var loadedExtension = {};

//browser action 
browser.browserAction.onClicked.addListener(function(tab) {
  console.log("clicked browser action");
  console.log(tab.id)
  console.log((tab.id in loadedExtension) == false)
  console.log(loadedExtension[tab.id] == false)

  //*
  if( (tab.id in loadedExtension) == false  || loadedExtension[tab.id] == false)
  {
    console.log("loading the content script");
    browser.tabs.executeScript(tab.id,{
      file: "custom-mathjax.min.js"
    });
    browser.tabs.executeScript(tab.id,{
      file:"contentScript.js"
    });
    loadedExtension[tab.id] = true;


  }
  else
  {
    browser.tabs.sendMessage(tab.id, {openCloseMenu: true});
  }



  //*/
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


function handleUpdate(tabId, removeInfo)
{
  console.log("changed tab - " + tabId);
  loadedExtension[tabId] = false;
}

browser.tabs.onUpdated.addListener(handleUpdate);