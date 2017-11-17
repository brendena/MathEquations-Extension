import { CustomElement, OnConnected, OnDisconnected } from './custom-elements';



@CustomElement({
    tagName: 'math-equation-anywhere',
    //options:{
    //    extends: "div"
    //}
})
export class MathEquationAnywhere extends HTMLElement implements OnConnected, OnDisconnected {
    //constructor(){
        //super();
    //}
    connectedCallback() {
        
        this.innerHTML = 'I have been rendered!';

        this.addEventListener('click', this.onClick.bind(this));
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.onClick);
    }

    onClick() {
        this.innerHTML = 'I was clicked!';
    }
}
