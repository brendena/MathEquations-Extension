
var browser = browser || chrome;
console.log("testing this out");
browser.browserAction.onClicked.addListener(function(tab) {
  browser.tabs.sendMessage(tab.id, {openCloseMenu: true});
});

browser.commands.onCommand.addListener(function(command) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {

        if (command == "open-close-extension") {
            browser.tabs.sendMessage(tabs[0].id, {openCloseMenu: true});
        }
    });
    
  });