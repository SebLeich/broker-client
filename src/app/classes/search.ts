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
    public pointsfeatures: number = 0;
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
            this.pointsfeatures = object.pointsfeatures;
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
            this.pointsfeatures
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
            "pointsfeatures": this.pointsfeatures,
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
    public features: SearchVectorListEntry;
    public types: IService[];
    public storageType: SearchVectorListEntry;
    public minFulfillmentPercentage: number;

    constructor() {
        this.certificates = new SearchVectorListEntry();
        this.datalocations = new SearchVectorListEntry();
        this.deploymentinfos = new SearchVectorListEntry();
        this.features = new SearchVectorListEntry();
        this.models = new SearchVectorListEntry();
        this.providers = new SearchVectorListEntry();
        this.types = [];
        this.storageType = new SearchVectorListEntry();
        this.minFulfillmentPercentage = 0;
    }

    addType(type: IService) {
        if(this.types.includes(type)) return;
        this.types.push(type);
        this.certificates.isSearchable = true;
        this.datalocations.isSearchable = true;
        this.deploymentinfos.isSearchable = true;
        this.models.isSearchable = true;
        this.providers.isSearchable = true;
        this.features.isSearchable = true;
        switch (type) {
            case BlockStorageService:
            case DirectAttachedService:
                this.storageType.isSearchable = true;
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
        if (this.features.isRelevant()) return true;
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
        this.features.isSearchable = false;
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