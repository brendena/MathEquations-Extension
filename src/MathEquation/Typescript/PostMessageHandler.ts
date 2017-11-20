export class PostMessageHandler {
    origin: string;
    prevStateMinimizeTextInput = true;
    prevStateMinimizeMenu = false;
    prevMouseResize = 0;
    marginErrorResize = 10;
    resizeAmount = 20;
    constructor(origin: string){
        this.origin = origin;
    }
    closeMenu(){
        parent.postMessage({"messageType": PostMessagesTypes.CloseMenu},this.origin);
    }
    mouseResize(directionMove:number){
        if( directionMove > this.resizeAmount ){
            directionMove = this.resizeAmount
        }
        else if (directionMove < -(this.resizeAmount) ) {
            directionMove = -(this.resizeAmount)
        }
        
        parent.postMessage({"messageType": PostMessagesTypes.MouseResize, "value": directionMove},this.origin);

    }
    MinimizeMenu(minimize:boolean){
        parent.postMessage({"messageType": PostMessagesTypes.MinimizeMenu, "value": minimize},this.origin);
    }
    MinimizeTextInput(minimize:boolean){
        //if previous the text box was and 
        if(minimize != this.prevStateMinimizeTextInput){
            parent.postMessage({"messageType": PostMessagesTypes.MinimizeTextInput, "value": minimize},this.origin);
        }
        this.prevStateMinimizeTextInput = minimize;
    }
}


export const enum PostMessagesTypes {
    MouseResize = "MouseResize",
    CloseMenu = "CloseMenu",
    MinimizeMenu = "MinimizeMenu",
    MinimizeTextInput = "MinimizeTextInput"
}