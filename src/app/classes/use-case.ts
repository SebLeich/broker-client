import {
    ServiceType
} from "./service";

/**
 * the class contains an use-case for service matching
 */
export class UseCase {
    id: number;
    titleDE: string;
    titleEN: string;
    titleES: string;
    internalDescription: string;
    creation: string;
    serviceClasses: ServiceType[] = [];
    isNew: boolean = true;
    isChanged: boolean = false;
    /**
     * the constructor creates a new instance of an use case
     */
    constructor(object: any){
        if(object != null && typeof(object) != "undefined"){
            if(object.id != null && typeof(object.id) != "undefined"){
                this.id = object.id;
            }
            if(object.titleDE != null && typeof(object.titleDE) != "undefined"){
                this.titleDE = object.titleDE;
            }
            if(object.titleEN != null && typeof(object.titleEN) != "undefined"){
                this.titleEN = object.titleEN;
            }
            if(object.titleES != null && typeof(object.titleES) != "undefined"){
                this.titleES = object.titleES;
            }
            if(object.internalDescription != null && typeof(object.internalDescription) != "undefined"){
                this.internalDescription = object.internalDescription;
            }
            if(object.creation != null && typeof(object.creation) != "undefined"){
                this.creation = object.creation;
            }
            if(object.serviceClassMapping != null && typeof(object.serviceClassMapping) != "undefined"){
                var output : ServiceType[] = [];
                for(let c of object.serviceClassMapping){
                    output.push(new ServiceType(c));
                }
                this.serviceClasses = output;
            }
        }
    }
    /**
     * the method returns the use cases server location
     */
    static get location(): string {
        return "api/usecase"
    }
    /**
     * the method creates the server's object of the current instance
     */
    toServerObject(){
        return {
            "id": this.id,
            "creation": this.creation,
            "titleDE": this.titleDE,
            "titleEN": this.titleEN,
            "titleES": this.titleES,
            "internalDescription": this.internalDescription,
            "serviceClassMapping": this.serviceClasses
        };
    }
    /**
     * the method creates a string representation of the use case
     */
    toString(): string {
        return this.titleDE;
    }
}