'use strict'


require('./MathEquation/Stylesheets/StylesheetCompiler.elm');


var handler = require('./ContentScript/Typescript/content.ts');
handler.constructUi({});
/*
if(window.customElements == undefined || window.WebComponents == undefined){
    require('./ContentScript/Typescript/content.ts');
}
else{
    var handler = require('./ContentScript/Typescript/content.ts');
    handler.constructUi({});
}
*/