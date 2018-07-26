'use strict'

require('./MathEquation/Stylesheets/StylesheetCompiler.elm');
//require('../node_modules/katex/dist/katex.min.js')






if(window.customElements == undefined || window.WebComponents == undefined){
    window.addEventListener('WebComponentsReady', function() {
        require('./MathEquation/Typescript/MathEquationComponent.ts')
    });
}
else{
    require('./MathEquation/Typescript/MathEquationComponent.ts')
}
