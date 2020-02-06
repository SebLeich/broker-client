export class Image {
    id: number;
    imageDescription: string;
    imageData: string;
    mediaType: string;
    constructor(object?){
        if(object != null && typeof(object) != "undefined"){
            if(object.id != null && typeof(object.id) != "undefined"){
                this.id = object.id;
            }
            if(object.imageDescription != null && typeof(object.imageDescription) != "undefined"){
                this.imageDescription = object.imageDescription;
            }
            if(object.imageData != null && typeof(object.imageData) != "undefined"){
                this.imageData = object.imageData;
            }
            if(object.mediaType != null && typeof(object.mediaType) != "undefined"){
                this.mediaType = object.mediaType;
            }
        }
    }
    static get location(): string {
        return "api/image";
    }
}