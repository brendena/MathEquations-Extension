export class PostMessageHandler {
    origin: string;
    constructor(origin: string){
        this.origin = origin;
    }
    closeMenu(){
        parent.postMessage({"messageType":"test"},this.origin);
    }
}


