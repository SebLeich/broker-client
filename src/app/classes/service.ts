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
    public serviceCompliance: string;
    public servcieAvailability : string;
    public cloudServiceCategory : ServiceCategory;
    public cloudServiceCategoryId : number;
    public cloudServiceModel : ServiceModel = null;
    public cloudServiceModelId : number;
    public providerId : number;
    public provider: Provider = null;
    public pricing: Pricing[] = [];
    public dataLocation = [];
    public deploymentInfo: DeploymentInformation = null;
    public serviceCertificates: ServiceCertificate[] = [];
    public sessionState : SessionState = new SessionState();
    /**
     * the constructor creates a new instance of a service
     */
    constructor(object?){
        if(typeof(object) != "undefined" && object != null){
            this.id = object.id;
            this.serviceName = object.serviceName;
            this.serviceDescription = object.serviceDescription;
            this.serviceCompliance = object.serviceCompliance;
            this.serviceTitle = object.serviceTitle;
            this.servcieAvailability = object.servcieAvailability;
            this.cloudServiceCategoryId = object.cloudServiceCategoryId;
            this.cloudServiceModelId = object.cloudServiceModelId;
            this.providerId = object.providerId;
            this.sessionState.isNew = false;
            if(typeof(object.cloudServiceCategory) != "undefined" && object.cloudServiceCategory != null){
                this.cloudServiceCategory = new ServiceCategory(object.cloudServiceCategory);
            }
            if(typeof(object.cloudServiceModel) != "undefined" && object.cloudServiceModel != null){
                this.cloudServiceModel = new ServiceModel(object.cloudServiceModel);
            }
            if(Array.isArray(object.pricing)){
                for(var index in object.pricing){
                    this.pricing.push(new Pricing(object.pricing[index]));
                }
            }
            if(Array.isArray(object.serviceCertificates)){
                for(var index in object.serviceCertificates){
                    this.serviceCertificates.push(new ServiceCertificate(object.serviceCertificates[index]));
                }
            }
            if(Array.isArray(object.serviceDataLocations)){
                for(var index in object.serviceDataLocations){
                    this.dataLocation.push(new DataLocation(object.serviceDataLocations[index].dataLocation));
                }
            }
            if(typeof(object.deploymentInfo) != "undefined" && object.deploymentInfo != null){
                this.deploymentInfo = new DeploymentInformation(object.deploymentInfo);
            }
            if(typeof(object.provider) != "undefined" && object.provider != null){
                this.provider = new Provider(object.provider);
            }
        } else {
            this.sessionState.isNew = true;
        }
    }
    /**
     * the method returns all certificates linked to the service
     */
    certificateIds(): number[] {
        return this.serviceCertificates.map(x => x.certificate.id);
    }
    /**
     * the static method returns the classes current server endpoint
     */
    abstract get location() : string;
    /**
     * the method creates the backend's interface
     */
    toServerObject(): any{
        return {
            "id": this.id,
            "serviceName": this.serviceName,
            "serviceDescription": this.serviceDescription,
            "serviceTitle": this.serviceTitle,
            "servcieAvailability": this.servcieAvailability,
            "cloudServiceCategoryId": this.cloudServiceCategoryId,
            "cloudServiceModelId": this.cloudServiceModelId,
            "providerId": this.providerId,
            "serviceCertificates": this.serviceCertificates
        };
    }
}
/**
 * the class contains a block storage servie
 */
export class BlockStorageService extends Service {
    public hasFileEncryption : boolean;
    public hasReplication : boolean;
    public storageTypeId : number;
    public storageType: StorageType;
    /**
     * the constructor creates a new block storage service
     */
    constructor(object?){
        if(typeof(object) != "undefined"){
            super(object);
            this.hasFileEncryption = object.hasFileEncryption;
            this.hasReplication = object.hasReplication;
            this.storageTypeId = object.storageTypeId;
            if(typeof(object.storageType) != "undefined" && object.storageType != null){
                this.storageType = new StorageType(object.storageType);
            }
        } else {
            super();
            this.hasFileEncryption = false;
            this.hasReplication = false;
            this.storageType = null;
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
    /**
     * the method creates the backend's interface
     */
    toServerObject(){
        var o = super.toServerObject();
        o.hasFileEncryption = this.hasFileEncryption;
        o.hasReplication = this.hasReplication;
        o.storageTypeId = this.storageTypeId;
        return o;
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
    public hasFileEncryption: boolean;
    public hasFileLocking: boolean;
    public hasFilePermissions: boolean;
    public hasFileVersioning: boolean;
    public hasReplication: boolean;

    /**
     * the constructor creates a new instance of the class
     */
    constructor(object){
        if(typeof(object) != "undefined"){
            super(object);
            this.hasFileEncryption = object.hasFileEncryption;
            this.hasFileLocking = object.hasFileLocking;
            this.hasFilePermissions = object.hasFilePermissions;
            this.hasFileVersioning = object.hasFileVersioning;
            this.hasReplication = object.hasReplication;
        } else {
            super();
            this.hasFileEncryption = false;
            this.hasFileLocking = false;
            this.hasFilePermissions = false;
            this.hasFileVersioning = false;
            this.hasReplication = false;
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
    /**
     * the method creates the backend's interface
     */
    toServerObject(){
        var o = super.toServerObject();
        o.hasFileEncryption = this.hasFileEncryption;
        o.hasFileLocking = this.hasFileLocking;
        o.hasFilePermissions = this.hasFilePermissions;
        o.hasFileVersioning = this.hasFileVersioning;
        o.hasReplication = this.hasReplication;
        return o;
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
 * the class contains a deployment information
 */
export class DeploymentInformation {
    public id: number;
    public deploymentName: string;
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object){
        this.id = object.id;
        this.deploymentName = object.deploymentName;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return DeploymentInformation.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/deploymentinformation";
    }
}
/**
 * the class contains a pricing dataset
 */
export class Pricing {
    public id: number;
    public pricingValue: number;
    public serviceId: number;
    public pricingModelId: number;
    public pricingPeriodId: number;
    public pricingModel: PricingModel = null;
    public pricingPeriod: PricingPeriod = null;
    /**
     * the constructor creates a new instance of a pricing dataset
     */
    constructor(object){
        this.id = object.id;
        this.pricingValue = object.pricingValue;
        this.serviceId = object.serviceId;
        this.pricingModelId = object.pricingModelId;
        this.pricingPeriodId = object.pricingPeriodId;
        if(typeof(object.pricingModel) != "undefined" && object.pricingModel != null){
            this.pricingModel = new PricingModel(object.pricingModel);
        }
        if(typeof(object.pricingPeriod) != "undefined" && object.pricingPeriod != null){
            this.pricingPeriod = new PricingPeriod(object.pricingPeriod);
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return Pricing.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/pricing";
    }
}
/**
 * the class contains a pricing model
 */
export class PricingModel {
    public id: number;
    public pricingModelName: string;
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object){
        this.id = object.id;
        this.pricingModelName = object.pricingModelName;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return PricingModel.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/pricingmodel";
    }
}
/**
 * the class contains a pricing model
 */
export class PricingPeriod {
    public id: number;
    public pricingPeriodName: string;
    public pricingPeriodCode: string;
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object){
        this.id = object.id;
        this.pricingPeriodName = object.pricingPeriodName;
        this.pricingPeriodCode = object.pricingPeriodCode;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return PricingPeriod.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/pricingperiod";
    }
}
/**
 * the class contains a pricing model
 */
export class Provider {
    public id: number;
    public providerName: string;
    public url: string;
    public revision: string;
    public verified: boolean;
    public payments: Payment[] = [];
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object){
        this.id = object.id;
        this.providerName = object.providerName;
        this.url = object.url;
        this.revision = object.revision;
        this.verified = object.verified;
        if(Array.isArray(object.providerPayments)){
            for(var index in object.providerPayments) this.payments.push(new Payment(object.providerPayments[index].payment));
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return Provider.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/provider";
    }
}
/**
 * the class contains a pricing model
 */
export class Payment {
    public id: number;
    public paymentType: string;
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object){
        this.id = object.id;
        this.paymentType = object.paymentType;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return Payment.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/payment";
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
/**
 * the class contains the service certificate n:m
 */
export class ServiceCertificate {
    public serviceId: number;
    public certificateId: number;
    public certificate: Certificate;
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object){
        this.serviceId = object.serviceId;
        this.certificateId = object.certificateId;
        this.certificate = new Certificate(object.certificate);
    }
}
/**
 * the class contains a certificate
 */
export class Certificate {
    public id: number;
    public certificateName: string;
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object){
        this.id = object.id;
        this.certificateName = object.certificateName;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return Certificate.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/certificate";
    }
}
/**
 * the class contains a datalocation
 */
export class DataLocation {
    public id: number;
    public dataLocationName: string;
    public dataLocationType: DataLocationType = null;
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object){
        if(object != null && typeof(object) != undefined){
            this.id = object.id;
            this.dataLocationName = object.dataLocationName;
            if(object.dataLocationType != null && typeof(object.dataLocationType) != undefined){
                this.dataLocationType = new DataLocationType(object.dataLocationType);
            }
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return DataLocation.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/datalocation";
    }
}
/**
 * the class contains a data location type
 */
export class DataLocationType {
    public id: number;
    public typeName: string;
    /**
     * the constructor creates a new instance of a data location type
     */
    constructor(object){
        if(object != null && typeof(object) != undefined){
            this.id = object.id;
            this.typeName = object.typeName;
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return DataLocationType.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/datalocationtype";
    }
}
/**
 * the class contains a service category
 */
export class ServiceModel {
    public id: number;
    public cloudServiceModelName: string;
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object){
        this.id = object.id;
        this.cloudServiceModelName = object.cloudServiceModelName;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return ServiceModel.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/cloudservicemodel";
    }
}
/**
 * the class contains a service provider
 */
export class ServiceProvider {
    public id: number;
    public providerName: string;
    /**
     * the constructor creates a new instance of a service provider
     */
    constructor(object){
        this.id = object.id;
        this.providerName = object.providerName;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return ServiceProvider.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/serviceprovider";
    }
}
/**
 * the class contains a storage type
 */
export class StorageType {
    public id: number;
    public storageTypeDescription: string;
    /**
     * the constructor creates a new instance of a storage type
     */
    constructor(object){
        this.id = object.id;
        this.storageTypeDescription = object.storageTypeDescription;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location() : string {
        return StorageType.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location() : string {
        return "api/storagetype";
    }
}