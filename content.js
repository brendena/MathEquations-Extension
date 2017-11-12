console.log("working5");

console.log(chrome.extension.getURL(""))
var baseUrl = chrome.extension.getURL("");
var div = document.createElement("div");
div.id = "test";
div.style.width = "100%";
div.style.position = "fixed"
div.style.bottom = "0"
//div.style.height = "200px";
div.style.background = "white";
div.style.zIndex = "2000"
console.log(div)

var app = Elm.Main.embed(div);

document.body.appendChild(div);

app.ports.updatingBaseUrl.send(baseUrl)

console.log(app.ports)