export class Feature {
    id: number = 0;
    descriptionDE: string;
    descriptionEN: string;
    descriptionES: string;
    internalDescription: string;
    icon: string;
    color: string;
    isNew: boolean;
    constructor(object?){
        if(object != null && typeof(object) != "undefined"){
            if(object.id != null && typeof(object.id) != "undefined"){
                this.id = object.id;
            }
            if(object.descriptionDE != null && typeof(object.descriptionDE) != "undefined"){
                this.descriptionDE = object.descriptionDE;
            }
            if(object.descriptionEN != null && typeof(object.descriptionEN) != "undefined"){
                this.descriptionEN = object.descriptionEN;
            }
            if(object.descriptionES != null && typeof(object.descriptionES) != "undefined"){
                this.descriptionES = object.descriptionES;
            }
            if(object.internalDescription != null && typeof(object.internalDescription) != "undefined"){
                this.internalDescription = object.internalDescription;
            }
            if(object.icon != null && typeof(object.icon) != "undefined"){
                this.icon = object.icon;
            }
            if(object.color != null && typeof(object.color) != "undefined"){
                this.color = object.color;
            }
        }
    }
    /**
     * the method returns the class's server location
     */
    static get location(): string {
        return "api/feature";
    }
    /**
     * the method creates the string representation of the feature
     */
    toString(): string {
        return this.descriptionDE;
    }
}