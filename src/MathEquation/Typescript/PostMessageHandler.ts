export class PostMessageHandler {
    origin: string;
    prevStateMinimizeTextInput = true;
    prevStateMinimizeMenu = false;
    lastPosition = 100;
    constructor(origin: string){
        this.origin = origin;
    }
    closeMenu(){
        console.log("closeMenu")
        parent.postMessage({"messageType": PostMessagesTypes.CloseMenu},this.origin);
    }
    mouseResize(directionMove:number){
        console.log("MouseResize")
        parent.postMessage({"messageType": PostMessagesTypes.MouseResize, "value": directionMove},this.origin);
        this.lastPosition = directionMove;
    }
    MinimizeMenu(minimize:boolean){
        console.log("MinimizeMenu")
        parent.postMessage({"messageType": PostMessagesTypes.MinimizeMenu, "value": minimize},this.origin);
    }
    MinimizeTextInput(minimize:boolean){
        console.log("MinimizeTextInput")
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