import { IService } from './service';

export class CloudServiceType {
    public name: string = "";
    public type: IService;
    constructor(object){
        this.name = object.name;
        this.type = object.type;
    }
}

export class SessionState {
    public isNew: boolean = true;
    constructor(){

    }
}