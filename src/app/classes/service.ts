import { SessionState } from "../classes/metadata";

export interface IService {
    new (object?): Service;
}
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
    public sessionState : SessionState = new SessionState();
    /**
     * the constructor creates a new instance of a service
     */
    constructor(object?){
        if(typeof(object) != "undefined"){
            this.id = object.id;
            this.serviceName = object.serviceName;
            this.serviceDescription = object.serviceDescription;
            this.serviceTitle = object.serviceTitle;
            this.servcieAvailability = object.servcieAvailability;
            this.cloudServiceCategoryId = object.cloudServiceCategoryId;
            this.providerId = object.providerId;
            this.sessionState.isNew = false;
        } else {
            this.sessionState.isNew = true;
        }
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
    constructor(object?){
        if(typeof(object) != "undefined"){
            super(object);
            this.hasFileEncryption = object.hasFileEncryption;
            this.hasReplication = object.hasReplication;
            this.storageTypeId = object.storageTypeId;
        } else {
            super();
        }
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

export class DirectAttachedService extends Service {
    /**
     * the constructor creates a new instance of the class
     */
    constructor(object){
        if(typeof(object) != "undefined"){
            super(object);
        } else {
            super();
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return DirectAttachedService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/directattachedstorageservice";
    }
}

export class KeyValueStorageService extends Service {
    /**
     * the constructor creates a new instance of the class
     */
    constructor(object){
        if(typeof(object) != "undefined"){
            super(object);
        } else {
            super();
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return KeyValueStorageService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/keyvaluestoreservice";
    }
}

export class ObjectStorageService extends Service {
    /**
     * the constructor creates a new instance of the class
     */
    constructor(object){
        if(typeof(object) != "undefined"){
            super(object);
        } else {
            super();
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return ObjectStorageService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/objectstorageservice";
    }
}

export class OnlineDriveStorageService extends Service {
    /**
     * the constructor creates a new instance of the class
     */
    constructor(object){
        if(typeof(object) != "undefined"){
            super(object);
        } else {
            super();
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return OnlineDriveStorageService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/onlinedrivestorageservice";
    }
}

export class RelationalDatabaseService extends Service {
    /**
     * the constructor creates a new instance of the class
     */
    constructor(object){
        if(typeof(object) != "undefined"){
            super(object);
        } else {
            super();
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return RelationalDatabaseService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/relationaldatabaseservice";
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