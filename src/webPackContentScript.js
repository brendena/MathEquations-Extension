'use strict'



require('./MathEquation/Stylesheets/StylesheetCompiler.elm');


var handler = require('./ContentScript/Typescript/content.ts');
handler.constructUi({});
