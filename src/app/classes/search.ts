import { IService, BlockStorageService, DirectAttachedService, ObjectStorageService, OnlineDriveStorageService, KeyValueStorageService, RelationalDatabaseService } from './service';
import { FormGroup } from '@angular/forms';

export class MatchingResponse {

    public service: any;
    public search: SearchVector;
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
    public prioritycategories: number = 0;
    public prioritycertificates: number = 0;
    public prioritydatalocations: number = 0;
    public prioritydeploymentinfos: number = 0;
    public prioritymodels: number = 0;
    public priorityproviders: number = 0;
    public prioritystoragetype: number = 0;
    public priorityHasFileEncryption: number = 0;
    public priorityHasReplication: number = 0;
    public priorityHasFilePermissions: number = 0;
    public priorityHasFileLocking: number = 0;
    public priorityHasFileCompression: number = 0;
    public priorityHasDBMS: number = 0;
    public priorityHasFileVersioning: number = 0;
    public priorityHasAutomatedSynchronisation: number = 0;

    constructor(match, content, search) {
        this.service = content;
        this.search = search;
        if(match != null && typeof(match) != "undefined"){
            this.pointscategories = match.pointscategories;
            this.pointscertificates = match.pointscertificates;
            this.pointsdatalocations = match.pointsdatalocations;
            this.pointsdeploymentinfos = match.pointsdeploymentinfos;
            this.pointsmodels = match.pointsmodels;
            this.pointsproviders = match.pointsproviders;
            this.pointsstoragetype = match.pointsstoragetype;
            this.pointsHasFileEncryption = match.pointsHasFileEncryption;
            this.pointsHasReplication = match.pointsHasReplication;
            this.pointsHasFilePermissions = match.pointsHasFilePermissions;
            this.pointsHasFileLocking = match.pointsHasFileLocking;
            this.pointsHasFileCompression = match.pointsHasFileCompression;
            this.pointsHasDBMS = match.pointsHasDBMS;
            this.pointsHasFileVersioning = match.pointsHasFileVersioning;
            this.pointsHasAutomatedSynchronisation = match.pointsHasAutomatedSynchronisation;
            this.prioritycategories = match.prioritycategories;
            this.prioritycertificates = match.prioritycertificates;
            this.prioritydatalocations = match.prioritydatalocations;
            this.prioritydeploymentinfos = match.prioritydeploymentinfos;
            this.prioritymodels = match.prioritymodels;
            this.priorityproviders = match.priorityproviders;
            this.prioritystoragetype = match.prioritystoragetype;
            this.priorityHasFileEncryption = match.priorityHasFileEncryption;
            this.priorityHasReplication = match.priorityHasReplication;
            this.priorityHasFilePermissions = match.priorityHasFilePermissions;
            this.priorityHasFileLocking = match.priorityHasFileLocking;
            this.priorityHasFileCompression = match.priorityHasFileCompression;
            this.priorityHasDBMS = match.priorityHasDBMS;
            this.priorityHasFileVersioning = match.priorityHasFileVersioning;
            this.priorityHasAutomatedSynchronisation = match.priorityHasAutomatedSynchronisation;
        }
    }

    get percentage(): number {
        if (this.total == 0) return 0;
        return Math.round((this.points / this.total) * 100);
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
            this.priorityHasAutomatedSynchronisation +
            this.pointsHasDBMS +
            this.pointsHasFileCompression +
            this.pointsHasFileEncryption +
            this.pointsHasFileLocking +
            this.pointsHasFilePermissions +
            this.pointsHasFileVersioning +
            this.pointsHasReplication
        );
    }

    get total(): number {
        return (
            this.prioritycategories +
            this.prioritycertificates +
            this.prioritydatalocations +
            this.prioritydeploymentinfos +
            this.prioritymodels +
            this.priorityproviders +
            this.prioritystoragetype +
            this.priorityHasAutomatedSynchronisation +
            this.priorityHasDBMS +
            this.priorityHasFileCompression +
            this.priorityHasFileEncryption +
            this.priorityHasFileLocking +
            this.priorityHasFilePermissions +
            this.priorityHasFileVersioning +
            this.priorityHasReplication
        );
    }
}

/**
 * the class represents a search vector for service filtering
 */
export class SearchVector {

    public categories: SearchVectorListEntry;
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
        this.categories = new SearchVectorListEntry();
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
        this.minFulfillmentPercentage = 0;
    }

    addType(type: IService) {
        this.types.push(type);
        switch (type) {
            case BlockStorageService:
                this.categories.isSearchable = true;
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
                this.categories.isSearchable = true;
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
                this.categories.isSearchable = true;
                this.certificates.isSearchable = true;
                this.datalocations.isSearchable = true;
                this.deploymentinfos.isSearchable = true;
                this.models.isSearchable = true;
                this.providers.isSearchable = true;
                this.hasDBMS.isSearchable = true;
                this.hasReplication.isSearchable = true;
                break;
            case ObjectStorageService:
                this.categories.isSearchable = true;
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
                this.categories.isSearchable = true;
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

    reset() {
        this.categories.isSearchable = false;
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
}