
var browser = browser || chrome;
console.log("---------------testing this out");
console.log(browser)
browser.browserAction.onClicked.addListener(function(tab) {
  console.log("test")
  console.log(tab)
  browser.tabs.sendMessage(tab.id, {openCloseMenu: true});
});

browser.commands.onCommand.addListener(function(command) {
  console.log("on command whent off")  
  chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        
        if (command == "open-close-extension") {
            browser.tabs.sendMessage(tabs[0].id, {openCloseMenu: true});
        }
    });
    
  });