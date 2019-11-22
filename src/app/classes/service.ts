/**
 * the class contains a generic cloud service
 */
export abstract class Service {
    public id : number;
    public serviceName : string;
    public serviceDescription : string;
    public serviceTitle : string;
    public servcieAvailability : string;
    public cloudServiceCategoryId : number;
    public providerId : number;
    /**
     * the constructor creates a new instance of a service
     */
    constructor(object){
        this.id = object.id;
        this.serviceName = object.serviceName;
        this.serviceDescription = object.serviceDescription;
        this.serviceTitle = object.serviceTitle;
        this.servcieAvailability = object.servcieAvailability;
        this.cloudServiceCategoryId = object.cloudServiceCategoryId;
        this.providerId = object.providerId;
    }
    /**
     * the static method returns the classes current server endpoint
     */
    abstract get location() : string;
}
/**
 * the class contains a block storage servie
 */
export class BlockStorageService extends Service {
    public hasFileEncryption : boolean;
    public hasReplication : boolean;
    public storageTypeId : number;
    /**
     * the constructor creates a new block storage service
     */
    constructor(object){
        super(object);
        this.hasFileEncryption = object.hasFileEncryption;
        this.hasReplication = object.hasReplication;
        this.storageTypeId = object.storageTypeId;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return BlockStorageService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/blockstorageservice";
    }
}
/**
 * the class contains a service category
 */
export class ServiceCategory {
    public id: number;
    public cloudServiceCategoryName: string;
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object){
        this.id = object.id;
        this.cloudServiceCategoryName = object.cloudServiceCategoryName;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return ServiceCategory.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/cloudservicecategory";
    }
}