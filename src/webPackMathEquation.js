'use strict'

require('./MathEquation/Stylesheets/StylesheetCompiler.elm');

//import styles from './MathEquation/Stylesheets/MyCss.css'
import styles from './MathEquation/Stylesheets/fontello/css/animation.css'
import styles from './MathEquation/Stylesheets/fontello/css/fontello-codes.css'
import styles from './MathEquation/Stylesheets/fontello/css/fontello.css'
import styles from '../node_modules/katex/dist/katex.min.css'

require('../node_modules/katex/dist/katex.min.js')




if(window.customElements == undefined || window.WebComponents == undefined){
    window.addEventListener('WebComponentsReady', function() {
        require('./MathEquation/Typescript/MathEquationComponent.ts')
    });
}
else{
    require('./MathEquation/Typescript/MathEquationComponent.ts')
}
