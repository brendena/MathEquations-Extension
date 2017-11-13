var baseUrl = chrome.extension.getURL("");
app.ports.updatingBaseUrl.send(baseUrl)



var submitTimer = undefined;
app.ports.updateEquation.subscribe(function (equationObject) {

    var equationJson = JSON.parse(equationObject)
    var event = new CustomEvent('build',{detail:  equationJson});
    document.dispatchEvent(event);
    

});
