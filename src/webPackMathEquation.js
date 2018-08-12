'use strict'

require('./MathEquation/Stylesheets/StylesheetCompiler.elm');


if(window.customElements == undefined || window.WebComponents == undefined){
    window.addEventListener('WebComponentsReady', function() {
        require('./MathEquation/Typescript/MathEquationComponent.ts')
    });
}
else{
    require('./MathEquation/Typescript/MathEquationComponent.ts')
}
