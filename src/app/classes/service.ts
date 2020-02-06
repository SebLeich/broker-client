import { SessionState } from "../classes/metadata";
import { Feature } from './feature';
import { Image } from './image';
/**
 * the generic service interface
 */
export interface IService {
    new(object?): Service;
    location: string;
    prettyName: string;
}
/**
 * the class contains a service preview
 */
export class ServicePreview {
    public id: number;
    public discriminator: string;
    public serviceName: string;
    public creation: Date;
    public lastModified: Date;
    constructor(object) {
        this.id = object.id;
        this.discriminator = object.discriminator;
        this.serviceName = object.serviceName;
        this.creation = new Date(object.creation);
        this.lastModified = new Date(object.lastModified);
    }
    get discriminatorNorm() {
        return this.discriminator.substr(0, 20).split("_")[0];
    }
}
/**
 * the class contains a generic cloud service
 */
export abstract class Service {
    public id: number;
    public serviceName: string;
    public serviceDescriptionDE: string;
    public serviceDescriptionEN: string;
    public serviceDescriptionES: string;
    public serviceTitleDE: string;
    public serviceTitleEN: string;
    public serviceTitleES: string;
    public serviceCompliance: string;
    public serviceAvailability: string;
    public cloudServiceModel: ServiceModel = null;
    public cloudServiceModelId: number;
    public providerId: number;
    public provider: Provider = null;
    public pricing: Pricing[] = [];
    public features: Feature[] = [];
    public deploymentInfo: DeploymentInformation = null;
    public deploymentInfoId: number;
    public certificates: Certificate[] = [];
    public dataLocations: DataLocation[] = [];
    public sessionState: SessionState = new SessionState();
    public creation: string;
    public lastModified: string;
    public logo: Image = null;
    public banner: Image = null;
    /**
     * the constructor creates a new instance of a service
     */
    constructor(object?) {
        console.log(object);
        if (typeof (object) != "undefined" && object != null) {
            this.id = object.id;
            this.serviceName = object.serviceName;
            this.serviceDescriptionDE = object.serviceDescriptionDE;
            this.serviceDescriptionEN = object.serviceDescriptionEN;
            this.serviceDescriptionES = object.serviceDescriptionES;
            this.serviceCompliance = object.serviceCompliance;
            this.serviceTitleDE = object.serviceTitleDE;
            this.serviceTitleEN = object.serviceTitleEN;
            this.serviceTitleES = object.serviceTitleES;
            this.serviceAvailability = object.serviceAvailability;
            this.cloudServiceModelId = object.cloudServiceModelId;
            this.deploymentInfoId = object.deploymentInfoId;
            this.providerId = object.providerId;
            this.sessionState.isNew = false;
            if (typeof (object.cloudServiceModel) != "undefined" && object.cloudServiceModel != null) {
                this.cloudServiceModel = new ServiceModel(object.cloudServiceModel);
            }
            if (typeof (object.logo) != "undefined" && object.logo != null) {
                this.logo = new Image(object.logo);
            }
            if (typeof (object.banner) != "undefined" && object.banner != null) {
                this.banner = new Image(object.banner);
            }
            if (Array.isArray(object.pricing)) {
                for (var index in object.pricing) {
                    this.pricing.push(new Pricing(object.pricing[index]));
                }
            }
            if (Array.isArray(object.certificates)) {
                for (var index in object.certificates) {
                    this.certificates.push(new Certificate(object.certificates[index]));
                }
            }
            if (Array.isArray(object.dataLocations)) {
                for (var index in object.dataLocations) {
                    this.dataLocations.push(new DataLocation(object.dataLocations[index]));
                }
            }
            if (Array.isArray(object.features)) {
                for (var index in object.features) {
                    this.features.push(new Feature(object.features[index]));
                }
            }
            if (typeof (object.deploymentInfo) != "undefined" && object.deploymentInfo != null) {
                this.deploymentInfo = new DeploymentInformation(object.deploymentInfo);
            }
            if (typeof (object.provider) != "undefined" && object.provider != null) {
                this.provider = new Provider(object.provider);
            }
        } else {
            this.sessionState.isNew = true;
        }
    }
    /**
     * the method returns all certificate ids
     */
    get certificateIds(): number[] {
        return this.certificates.map(x => x.id);
    }
    /**
     * the method returns all data location ids
     */
    get dataLocationIds(): number[] {
        return this.dataLocations.map(x => x.id);
    }
    /**
     * the method returns all feature ids
     */
    get featureIds(): number[] {
        return this.features.map(x => x.id);
    }
    /**
     * the method returns the classe's icon
     */
    static get icon(){
        return "cloud_queue";
    }
    /**
     * the static method returns the classes current server endpoint
     */
    abstract get location(): string;
    /**
     * the method creates the backend's interface
     */
    toServerObject(): any {
        var o: any = {
            "id": this.id,
            "serviceName": this.serviceName,
            "serviceDescriptionDE": this.serviceDescriptionDE,
            "serviceDescriptionEN": this.serviceDescriptionEN,
            "serviceDescriptionES": this.serviceDescriptionES,
            "serviceTitleDE": this.serviceTitleDE,
            "serviceTitleEN": this.serviceTitleEN,
            "serviceTitleES": this.serviceTitleES,
            "serviceAvailability": this.serviceAvailability,
            "cloudServiceModelId": this.cloudServiceModelId,
            "providerId": this.providerId,
            "certificates": this.certificates,
            "dataLocations": this.dataLocations,
            "features": this.features
        };
        if(this.logo != null) o.logoId = this.logo.id;
        if(this.banner != null) o.bannerId = this.banner.id;
        return o;
    }
    /**
     * the method returns the classes string representation
     */
    toString(): string {
        return this.serviceName;
    }
}
/**
 * the class contains a block storage servie
 */
export class BlockStorageService extends Service {
    public hasFileEncryption: boolean;
    public hasReplication: boolean;
    public storageTypeId: number;
    public storageType: StorageType;
    /**
     * the constructor creates a new block storage service
     */
    constructor(object?) {
        if (typeof (object) != "undefined") {
            super(object);
            this.hasFileEncryption = object.hasFileEncryption;
            this.hasReplication = object.hasReplication;
            this.storageTypeId = object.storageTypeId;
            if (typeof (object.storageType) != "undefined" && object.storageType != null) {
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
     * the method returns the classes default icon
     */
    static get icon(): string {
        return "dns";
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return BlockStorageService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/blockstorageservice";
    }
    /**
     * the method returns the pretty classes name
     */
    static get prettyName(): string {
        return "Block Storage Service";
    }
    /**
     * the method creates the backend's interface
     */
    toServerObject() {
        var o = super.toServerObject();
        o.hasFileEncryption = this.hasFileEncryption;
        o.hasReplication = this.hasReplication;
        o.storageTypeId = this.storageTypeId;
        return o;
    }
}
/**
 * the class contains a direct attached service
 */
export class DirectAttachedService extends Service {
    public hasFileEncryption: boolean;
    public hasReplication: boolean;
    public hasFileCompression: boolean;
    public hasFilePermissions: boolean;
    public hasFileLocking: boolean;
    public storageTypeId: number;
    public storageType: StorageType;

    /**
     * the constructor creates a new instance of the class
     */
    constructor(object?) {
        if (object != null && typeof (object) != "undefined") {
            super(object);
            this.hasFileEncryption = object.hasFileEncryption;
            this.hasReplication = object.hasReplication;
            this.hasFileCompression = object.hasFileCompression;
            this.hasFilePermissions = object.hasFilePermissions;
            this.hasFileLocking = object.hasFileLocking;
            this.storageTypeId = object.storageTypeId;
            if (typeof (object.storageType) != "undefined" && object.storageType != null) {
                this.storageType = new StorageType(object.storageType);
            }
        } else {
            super();
            this.storageTypeId = null;
        }
    }
    /**
     * the method returns the classes default icon
     */
    static get icon(): string {
        return "devices";
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return DirectAttachedService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/directattachedstorageservice";
    }
    /**
     * the method returns the pretty classes name
     */
    static get prettyName(): string {
        return "Direct Attached Storage Service";
    }
    /**
     * the method creates the the classes object fitting the backend's interface
     */
    toServerObject() {
        var o = super.toServerObject();
        o.storageTypeId = this.storageTypeId;
        o.hasFileEncryption = this.hasFileEncryption;
        o.hasReplication = this.hasReplication;
        o.hasFileCompression = this.hasFileCompression;
        o.hasFilePermissions = this.hasFilePermissions;
        o.hasFileLocking = this.hasFileLocking;
        return o;
    }
}
/**
 * the class contains a key value storage
 */
export class KeyValueStorageService extends Service {
    public hasDBMS: boolean;
    public hasReplication: boolean;
    /**
     * the constructor creates a new instance of the class
     */
    constructor(object?) {
        if (object != null && typeof (object) != "undefined") {
            super(object);
            this.hasDBMS = object.hasDBMS;
            this.hasReplication = object.hasReplication;
        } else {
            super();
            this.hasDBMS = false;
            this.hasReplication = false;
        }
    }
    /**
     * the method returns the classes default icon
     */
    static get icon(): string {
        return "dvr";
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return KeyValueStorageService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/keyvaluestoreservice";
    }
    /**
     * the method returns the pretty classes name
     */
    static get prettyName(): string {
        return "Key Value Storage Service";
    }
    /**
     * the method creates the backend's interface
     */
    toServerObject() {
        var o = super.toServerObject();
        o.hasDBMS = this.hasDBMS;
        o.hasReplication = this.hasReplication;
        return o;
    }
}
/**
 * the class contains object storage services
 */
export class ObjectStorageService extends Service {
    public hasFileEncryption: boolean;
    public hasFileLocking: boolean;
    public hasFilePermissions: boolean;
    public hasFileVersioning: boolean;
    public hasReplication: boolean;

    /**
     * the constructor creates a new instance of the class
     */
    constructor(object?) {
        if (object != null && typeof (object) != "undefined") {
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
     * the method returns the classes default icon
     */
    static get icon(): string {
        return "memory";
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return ObjectStorageService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/objectstorageservice";
    }
    /**
     * the method returns the pretty classes name
     */
    static get prettyName(): string {
        return "Object Storage Service";
    }
    /**
     * the method creates the backend's interface
     */
    toServerObject() {
        var o = super.toServerObject();
        o.hasFileEncryption = this.hasFileEncryption;
        o.hasFileLocking = this.hasFileLocking;
        o.hasFilePermissions = this.hasFilePermissions;
        o.hasFileVersioning = this.hasFileVersioning;
        o.hasReplication = this.hasReplication;
        return o;
    }
}
/**
 * the class contains online drive storage services
 */
export class OnlineDriveStorageService extends Service {
    public hasFileEncryption: boolean;
    public hasAutomatedSynchronisation: boolean;
    public hasFilePermissions: boolean;
    public hasFileVersioning: boolean;
    /**
     * the constructor creates a new instance of the class
     */
    constructor(object?) {
        if (object != null && typeof (object) != "undefined") {
            super(object);
            this.hasFileEncryption = object.hasFileEncryption;
            this.hasAutomatedSynchronisation = object.hasAutomatedSynchronisation;
            this.hasFilePermissions = object.hasFilePermissions;
            this.hasFileVersioning = object.hasFileVersioning;
        } else {
            super();
            this.hasFileEncryption = false;
            this.hasAutomatedSynchronisation = false;
            this.hasFilePermissions = false;
            this.hasFileVersioning = false;
        }
    }
    /**
     * the method returns the classes default icon
     */
    static get icon(): string {
        return "filter_drama";
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return OnlineDriveStorageService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/onlinedrivestorageservice";
    }
    /**
     * the method returns the pretty classes name
     */
    static get prettyName(): string {
        return "Online Drive Storage Service";
    }
}
/**
 * the class contains relataional database storage services
 */
export class RelationalDatabaseService extends Service {
    public hasDBMS: boolean;
    public hasReplication: boolean;
    /**
     * the constructor creates a new instance of the class
     */
    constructor(object?) {
        if (object != null && typeof (object) != "undefined") {
            super(object);
            this.hasDBMS = object.hasDBMS;
            this.hasReplication = object.hasReplication;
        } else {
            super();
            this.hasDBMS = false;
            this.hasReplication = false;
        }
    }
    /**
     * the method returns the classes default icon
     */
    static get icon(): string {
        return "layers";
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return RelationalDatabaseService.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/relationaldatabaseservice";
    }
    /**
     * the method returns the pretty classes name
     */
    static get prettyName(): string {
        return "Relational Database Storage Service";
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
    constructor(object) {
        this.id = object.id;
        this.deploymentName = object.deploymentName;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return DeploymentInformation.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/deploymentinformation";
    }
    /**
     * the method returns a string representation of the instance
     */
    toString(): string {
        return this.deploymentName;
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
    constructor(object) {
        this.id = object.id;
        this.pricingValue = object.pricingValue;
        this.serviceId = object.serviceId;
        this.pricingModelId = object.pricingModelId;
        this.pricingPeriodId = object.pricingPeriodId;
        if (typeof (object.pricingModel) != "undefined" && object.pricingModel != null) {
            this.pricingModel = new PricingModel(object.pricingModel);
        }
        if (typeof (object.pricingPeriod) != "undefined" && object.pricingPeriod != null) {
            this.pricingPeriod = new PricingPeriod(object.pricingPeriod);
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return Pricing.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
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
    constructor(object) {
        this.id = object.id;
        this.pricingModelName = object.pricingModelName;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return PricingModel.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
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
    constructor(object) {
        this.id = object.id;
        this.pricingPeriodName = object.pricingPeriodName;
        this.pricingPeriodCode = object.pricingPeriodCode;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return PricingPeriod.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
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
    public verified: boolean = false;
    public payments: Payment[] = [];
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object) {
        this.id = object.id;
        this.providerName = object.providerName;
        this.url = object.url;
        this.revision = object.revision;
        this.verified = object.verified;
        if (Array.isArray(object.providerPayments)) {
            for (var index in object.providerPayments) this.payments.push(new Payment(object.providerPayments[index].payment));
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return Provider.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/provider";
    }
    /**
     * the method returns the provider's server object
     */
    toServerObject(): any {
        return {
            "id": this.id,
            "providerName": this.providerName,
            "url": this.url,
            "revision": this.revision,
            "verified": this.verified
        };
    }
    /**
     * the method returns a string representation of the instance
     */
    toString(): string {
        return this.providerName;
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
    constructor(object) {
        this.id = object.id;
        this.paymentType = object.paymentType;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return Payment.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/payment";
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
    constructor(object) {
        this.id = object.id;
        this.certificateName = object.certificateName;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return Certificate.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/certificate";
    }
    /**
     * the method returns a string representation of the instance
     */
    toString(): string {
        return this.certificateName;
    }
}
/**
 * the class contains a datalocation
 */
export class DataLocation {
    public id: number;
    public dataLocationNameDE: string;
    public dataLocationNameEN: string;
    public dataLocationNameES: string;
    public dataLocationType: DataLocationType = null;
    /**
     * the constructor creates a new instance of a service category
     */
    constructor(object) {
        if (object != null && typeof (object) != undefined) {
            this.id = object.id;
            this.dataLocationNameDE = object.dataLocationNameDE;
            this.dataLocationNameEN = object.dataLocationNameEN;
            this.dataLocationNameES = object.dataLocationNameES;
            if (object.dataLocationType != null && typeof (object.dataLocationType) != undefined) {
                this.dataLocationType = new DataLocationType(object.dataLocationType);
            }
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return DataLocation.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/datalocation";
    }
    /**
     * the method returns a string representation of the instance
     */
    toString(): string {
        if (this.dataLocationType == null) return this.dataLocationNameDE;
        return this.dataLocationType + ": " + this.dataLocationNameDE;
    }
}
/**
 * the class contains a data location type
 */
export class DataLocationType {
    public id: number;
    public typeNameDE: string;
    public typeNameEN: string;
    public typeNameES: string;
    /**
     * the constructor creates a new instance of a data location type
     */
    constructor(object) {
        if (object != null && typeof (object) != undefined) {
            this.id = object.id;
            this.typeNameDE = object.typeNameDE;
            this.typeNameEN = object.typeNameEN;
            this.typeNameES = object.typeNameES;
        }
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return DataLocationType.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/datalocationtype";
    }
    /**
     * the method returns a string representation of the instance
     */
    toString(): string {
        return this.typeNameDE;
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
    constructor(object) {
        this.id = object.id;
        this.cloudServiceModelName = object.cloudServiceModelName;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return ServiceModel.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/cloudservicemodel";
    }
    /**
     * the method returns a string representation of the instance
     */
    toString(): string {
        return this.cloudServiceModelName;
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
    constructor(object) {
        this.id = object.id;
        this.providerName = object.providerName;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return ServiceProvider.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/serviceprovider";
    }
    /**
     * the method returns a string representation of the instance
     */
    toString(): string {
        return this.providerName;
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
    constructor(object) {
        this.id = object.id;
        this.storageTypeDescription = object.storageTypeDescription;
    }
    /**
     * the method returns the classes server endpoint
     */
    get location(): string {
        return StorageType.location;
    }
    /**
     * the method returns the classes server endpoint
     */
    static get location(): string {
        return "api/storagetype";
    }
    /**
     * the method returns a string representation of the instance
     */
    toString(): string {
        return this.storageTypeDescription;
    }
}
/**
 * the method contains the service types
 */
export class ServiceType {
    public id: number;
    public name: string;
    public desc: string;
    constructor(object: any){
        if(object != null && typeof(object) != "undefined"){
            if(object.id != null && typeof(object.id) != "undefined"){
                this.id = object.id;
            }
            if(object.name != null && typeof(object.name) != "undefined"){
                this.name = object.name;
            }
            if(object != null && typeof(object) != "undefined"){
                this.desc = object.description;
            }
        }
    }
    /**
     * the method returns the classes server location
     */
    static get location(): string {
        return "api/service/classes";
    }
    /**
     * the method returns all available service types
     */
    toString(): string {
        if(this.desc == null || typeof(this.desc) == "undefined" || this.desc == "") return this.name;
        return this.desc;
    }
}

export const serviceMapping = {
    "bls": BlockStorageService,
    "das": DirectAttachedService,
    "obs": ObjectStorageService,
    "ods": OnlineDriveStorageService,
    "kvs": KeyValueStorageService,
    "rds": RelationalDatabaseService,
    BlockStorageService: "bls",
    DirectAttachedService: "das",
    ObjectStorageService: "obs",
    OnlineDriveStorageService: "ods",
    KeyValueStorageService: "kvs",
    RelationalDatabaseService: "rds",
    "BLOCKSTORAGESERVICE": BlockStorageService,
    "DIRECTATTACHEDSTORAGESERVICE": DirectAttachedService,
    "KEYVALUESTORAGESERVICE": KeyValueStorageService,
    "OBJECTSTORAGESERVICE": ObjectStorageService,
    "ONLINEDRIVESTORAGESERVICE": OnlineDriveStorageService,
    "RELATIONALDATABASESTORAGESERVICE": RelationalDatabaseService
}