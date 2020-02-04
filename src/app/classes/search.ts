import { IService, BlockStorageService, DirectAttachedService, ObjectStorageService, OnlineDriveStorageService, KeyValueStorageService, RelationalDatabaseService, Service } from './service';
import { FormGroup } from '@angular/forms';
import { SessionState } from './metadata';

export class MatchingResponse {
    public id: number;
    public created: string;
    public note: string;
    public isFavored: boolean = false;
    public service: any;
    public projectId: number;
    public pointscategories: number = 0;
    public pointscertificates: number = 0;
    public pointsdatalocations: number = 0;
    public pointsdeploymentinfos: number = 0;
    public pointsmodels: number = 0;
    public pointsproviders: number = 0;
    public pointsstoragetype: number = 0;
    public pointsHasFileEncryption: number = 0;
    public pointsHasReplication: number = 0;
    public pointsHasFilePermissions: number = 0;
    public pointsHasFileLocking: number = 0;
    public pointsHasFileCompression: number = 0;
    public pointsHasDBMS: number = 0;
    public pointsHasFileVersioning: number = 0;
    public pointsHasAutomatedSynchronisation: number = 0;
    public serviceType: string;
    public sessionState: SessionState = new SessionState();
    
    constructor(object) {
        if (object != null && typeof (object) != "undefined") {
            this.id = object.id,
            this.created = object.created;
            this.note = object.note;
            this.isFavored = object.isFavored;
            this.projectId = object.projectId;
            this.pointscategories = object.pointscategories;
            this.pointscertificates = object.pointscertificates;
            this.pointsdatalocations = object.pointsdatalocations;
            this.pointsdeploymentinfos = object.pointsdeploymentinfos;
            this.pointsmodels = object.pointsmodels;
            this.pointsproviders = object.pointsproviders;
            this.pointsstoragetype = object.pointsstoragetype;
            this.pointsHasFileEncryption = object.pointsHasFileEncryption;
            this.pointsHasReplication = object.pointsHasReplication;
            this.pointsHasFilePermissions = object.pointsHasFilePermissions;
            this.pointsHasFileLocking = object.pointsHasFileLocking;
            this.pointsHasFileCompression = object.pointsHasFileCompression;
            this.pointsHasDBMS = object.pointsHasDBMS;
            this.pointsHasFileVersioning = object.pointsHasFileVersioning;
            this.pointsHasAutomatedSynchronisation = object.pointsHasAutomatedSynchronisation;
            this.initService(object.service, object.serviceType);
        }
    }

    hasService(): boolean {
        return (this.service != null);
    }

    initService(service: any, type: string) {
        switch (type) {
            case "BlockStorageService":
                this.serviceType = type;
                this.service = new BlockStorageService(service);
                break;
            case "DirectAttachedStorageService":
                this.serviceType = type;
                this.service = new DirectAttachedService(service);
                break;
            case "KeyValueStorageService":
                this.serviceType = type;
                this.service = new KeyValueStorageService(service);
                break;
            case "ObjectStorageService":
                this.serviceType = type;
                this.service = new ObjectStorageService(service);
                break;
            case "OnlineDriveStorageService":
                this.serviceType = type;
                this.service = new OnlineDriveStorageService(service);
                break;
            case "RelationalDatabaseStorageService":
                this.serviceType = type;
                this.service = new RelationalDatabaseService(service);
                break;
            default:
                console.log("unknown service type: " + type);
                break;
        }
    }

    get localType(): IService {
        switch(this.serviceType){
            case "BlockStorageService": return BlockStorageService;
            case "DirectAttachedStorageService": return DirectAttachedService;
            case "KeyValueStorageService": return KeyValueStorageService;
            case "ObjectStorageService": return ObjectStorageService;
            case "OnlineDriveStorageService": return OnlineDriveStorageService;
            case "RelationalDatabaseStorageService": return RelationalDatabaseService;
        }
        return null;
    }

    static get location(): string {
        return "api/matchingresponse";
    }

    get points(): number {
        return (
            this.pointscategories +
            this.pointscertificates +
            this.pointsdatalocations +
            this.pointsdeploymentinfos +
            this.pointsmodels +
            this.pointsproviders +
            this.pointsstoragetype +
            this.pointsHasAutomatedSynchronisation +
            this.pointsHasDBMS +
            this.pointsHasFileCompression +
            this.pointsHasFileEncryption +
            this.pointsHasFileLocking +
            this.pointsHasFilePermissions +
            this.pointsHasFileVersioning +
            this.pointsHasReplication
        );
    }

    get title() {
        if (this.service == null) return "Eintrag ohne Service";
        return this.service.toString();
    }

    toServerObject(): any {
        return {
            "id": this.id,
            "pointscategories": this.pointscategories,
            "pointscertificates": this.pointscertificates,
            "pointsdatalocations": this.pointsdatalocations,
            "pointsdeploymentinfos": this.pointsdeploymentinfos,
            "pointsmodels": this.pointsmodels,
            "pointsproviders": this.pointsproviders,
            "pointsstoragetype": this.pointsstoragetype,
            "pointsHasFileEncryption": this.pointsHasFileEncryption,
            "pointsHasReplication": this.pointsHasReplication,
            "pointsHasFilePermissions": this.pointsHasFilePermissions,
            "pointsHasFileLocking": this.pointsHasFileLocking,
            "pointsHasFileCompression": this.pointsHasFileCompression,
            "pointsHasDBMS": this.pointsHasDBMS,
            "pointsHasFileVersioning": this.pointsHasFileVersioning,
            "pointsHasAutomatedSynchronisation": this.pointsHasAutomatedSynchronisation,
            "projectId": this.projectId
        };
    }

    toString(): string {
        if(this.service == null) return "Match ohne Service vom " + this.created;
        return this.service.toString();
    }
}

/**
 * the class represents a search vector for service filtering
 */
export class SearchVector {

    public certificates: SearchVectorListEntry;
    public datalocations: SearchVectorListEntry;
    public deploymentinfos: SearchVectorListEntry;
    public models: SearchVectorListEntry;
    public providers: SearchVectorListEntry;
    public types: IService[];
    public hasFileEncryption: SearchVectorBooleanEntry;
    public hasReplication: SearchVectorBooleanEntry;
    public storageType: SearchVectorListEntry;
    public hasFileCompression: SearchVectorBooleanEntry;
    public hasFilePermissions: SearchVectorBooleanEntry;
    public hasFileLocking: SearchVectorBooleanEntry;
    public hasDBMS: SearchVectorBooleanEntry;
    public hasFileVersioning: SearchVectorBooleanEntry;
    public hasAutomatedSynchronisation: SearchVectorBooleanEntry;
    public minFulfillmentPercentage: number;

    constructor() {
        this.certificates = new SearchVectorListEntry();
        this.datalocations = new SearchVectorListEntry();
        this.deploymentinfos = new SearchVectorListEntry();
        this.models = new SearchVectorListEntry();
        this.providers = new SearchVectorListEntry();
        this.types = [];
        this.hasFileEncryption = new SearchVectorBooleanEntry();
        this.hasReplication = new SearchVectorBooleanEntry();
        this.storageType = new SearchVectorListEntry();
        this.hasFileCompression = new SearchVectorBooleanEntry();
        this.hasFilePermissions = new SearchVectorBooleanEntry();
        this.hasFileLocking = new SearchVectorBooleanEntry();
        this.hasDBMS = new SearchVectorBooleanEntry();
        this.hasFileVersioning = new SearchVectorBooleanEntry();
        this.hasAutomatedSynchronisation = new SearchVectorBooleanEntry();
        this.minFulfillmentPercentage = 50;
    }

    addType(type: IService) {
        if(this.types.includes(type)) return;
        this.types.push(type);
        switch (type) {
            case BlockStorageService:
                this.certificates.isSearchable = true;
                this.datalocations.isSearchable = true;
                this.deploymentinfos.isSearchable = true;
                this.models.isSearchable = true;
                this.providers.isSearchable = true;
                this.hasFileEncryption.isSearchable = true;
                this.hasReplication.isSearchable = true;
                this.storageType.isSearchable = true;
                break;
            case DirectAttachedService:
                this.certificates.isSearchable = true;
                this.datalocations.isSearchable = true;
                this.deploymentinfos.isSearchable = true;
                this.models.isSearchable = true;
                this.providers.isSearchable = true;
                this.hasFileEncryption.isSearchable = true;
                this.hasReplication.isSearchable = true;
                this.storageType.isSearchable = true;
                this.hasFileCompression.isSearchable = true;
                this.hasFileLocking.isSearchable = true;
                this.hasFilePermissions.isSearchable = true;
                break;
            case KeyValueStorageService:
            case RelationalDatabaseService:
                this.certificates.isSearchable = true;
                this.datalocations.isSearchable = true;
                this.deploymentinfos.isSearchable = true;
                this.models.isSearchable = true;
                this.providers.isSearchable = true;
                this.hasDBMS.isSearchable = true;
                this.hasReplication.isSearchable = true;
                break;
            case ObjectStorageService:
                this.certificates.isSearchable = true;
                this.datalocations.isSearchable = true;
                this.deploymentinfos.isSearchable = true;
                this.models.isSearchable = true;
                this.providers.isSearchable = true;
                this.hasFileEncryption.isSearchable = true;
                this.hasFileLocking.isSearchable = true;
                this.hasFilePermissions.isSearchable = true;
                this.hasFileVersioning.isSearchable = true;
                this.hasReplication.isSearchable = true;
                break;
            case OnlineDriveStorageService:
                this.certificates.isSearchable = true;
                this.datalocations.isSearchable = true;
                this.deploymentinfos.isSearchable = true;
                this.models.isSearchable = true;
                this.providers.isSearchable = true;
                this.hasFileEncryption.isSearchable = true;
                this.hasFileVersioning.isSearchable = true;
                this.hasFilePermissions.isSearchable = true;
                this.hasAutomatedSynchronisation.isSearchable = true;
                break;
        }
    }

    applyForm(fg: FormGroup) {
        for (var index in fg.value) {
            if (typeof (index) != "string") {
                console.log("index is no string");
                continue;
            }
            if (typeof (this[index]) == "undefined") {
                var a = index.split("-");
                if (a.length != 2 || a[1] != "prio" || typeof (this[a[0]]) == "undefined") continue;
                this[a[0]].priority = fg.value[index];
            } else {
                this[index].value = fg.value[index];
            }
        }
    }

    isSearchable(): boolean {
        if (this.types.length == 0) return false;
        if (this.certificates.isRelevant()) return true;
        if (this.datalocations.isRelevant()) return true;
        if (this.deploymentinfos.isRelevant()) return true;
        if (this.models.isRelevant()) return true;
        if (this.providers.isRelevant()) return true;
        if (this.storageType.isRelevant()) return true;
        if (this.hasAutomatedSynchronisation.isRelevant()) return true;
        if (this.hasDBMS.isRelevant()) return true;
        if (this.hasFileCompression.isRelevant()) return true;
        if (this.hasFileEncryption.isRelevant()) return true;
        if (this.hasFileLocking.isRelevant()) return true;
        if (this.hasFilePermissions.isRelevant()) return true;
        if (this.hasFileVersioning.isRelevant()) return true;
        if (this.hasReplication.isRelevant()) return true;
        return false;
    }

    reset() {
        this.certificates.isSearchable = false;
        this.datalocations.isSearchable = false;
        this.deploymentinfos.isSearchable = false;
        this.models.isSearchable = false;
        this.providers.isSearchable = false;
        this.types = [];
        this.storageType.isSearchable = false;
        this.hasAutomatedSynchronisation.isSearchable = false;
        this.hasDBMS.isSearchable = false;
        this.hasFileCompression.isSearchable = false;
        this.hasFileEncryption.isSearchable = false;
        this.hasFileLocking.isSearchable = false;
        this.hasFilePermissions.isSearchable = false;
        this.hasFileVersioning.isSearchable = false;
        this.hasReplication.isSearchable = false;
    }
}


export class SearchVectorBooleanEntry {

    public isSearchable: boolean;
    public value: boolean;
    public priority: number;

    constructor(object?) {
        this.isSearchable = false;
        this.value = false;
        this.priority = 0;
        if (typeof (object) != "undefined" && object != null) {
            if (typeof (object.isSearchable) == "boolean") {
                this.isSearchable = object.isSearchable;
            }
            if (typeof (object.value) == "boolean") {
                this.value = object.value;
            }
            if (typeof (object.priority) == "number") {
                this.priority = object.priority;
            }
        }
    }

    isRelevant(): boolean {
        if (this.isSearchable && this.value && this.priority > 0) return true;
        return false;
    }
}


export class SearchVectorListEntry {

    public isSearchable: boolean;
    public value: number[];
    public priority: number;

    constructor(object?) {
        this.isSearchable = false;
        this.value = [];
        this.priority = 1;
        if (typeof (object) != "undefined" && object != null) {
            if (typeof (object.isSearchable) == "boolean") {
                this.isSearchable = object.isSearchable;
            }
            if (typeof (object.priority) == "number") {
                this.priority = object.priority;
            }
            if (Array.isArray(object.value)) {
                this.value = object.value;
            }
        }
    }

    isRelevant(): boolean {
        if (this.isSearchable && Array.isArray(this.value) && this.value.length > 0 && this.priority > 0) return true;
        return false;
    }
}