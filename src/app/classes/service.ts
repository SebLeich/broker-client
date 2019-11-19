/**
 * the class contains a generic cloud service
 */
export abstract class Service {
    public id : number;
    public serviceName : string;
    public serviceDescription : string;
    public serviceTitle : string;
    public servcieAvailability : string;
}
/**
 * the class contains a block storage servie
 */
export class BlockStorageService extends Service {
    public hasFileEncryption : boolean;
    public hasReplication : boolean;
    public storageTypeId : number;

    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "/api/blockstorageservice";
    }
}