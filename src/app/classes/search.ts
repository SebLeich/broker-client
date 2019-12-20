import { IService, BlockStorageService, DirectAttachedService, ObjectStorageService, OnlineDriveStorageService, KeyValueStorageService, RelationalDatabaseService } from './service';
import { FormGroup } from '@angular/forms';

/**
 * the class represents a search vector for service filtering
 */
export class SearchVector {

    public categories: SearchVectorListEntry;
    public certificates: SearchVectorListEntry;
    public dataLocations: SearchVectorListEntry;
    public deploymentInformation: SearchVectorListEntry;
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

    constructor() {
        this.categories = new SearchVectorListEntry();
        this.certificates = new SearchVectorListEntry();
        this.dataLocations = new SearchVectorListEntry();
        this.deploymentInformation = new SearchVectorListEntry();
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
    }

    addType(type: IService) {
        this.types.push(type);
        switch (type) {
            case BlockStorageService:
                this.categories.isSearchable = true;
                this.certificates.isSearchable = true;
                this.dataLocations.isSearchable = true;
                this.deploymentInformation.isSearchable = true;
                this.models.isSearchable = true;
                this.providers.isSearchable = true;
                this.hasFileEncryption.isSearchable = true;
                this.hasReplication.isSearchable = true;
                this.storageType.isSearchable = true;
                break;
            case DirectAttachedService:
                this.categories.isSearchable = true;
                this.certificates.isSearchable = true;
                this.dataLocations.isSearchable = true;
                this.deploymentInformation.isSearchable = true;
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
                this.dataLocations.isSearchable = true;
                this.deploymentInformation.isSearchable = true;
                this.models.isSearchable = true;
                this.providers.isSearchable = true;
                this.hasDBMS.isSearchable = true;
                this.hasReplication.isSearchable = true;
                break;
            case ObjectStorageService:
                this.categories.isSearchable = true;
                this.certificates.isSearchable = true;
                this.dataLocations.isSearchable = true;
                this.deploymentInformation.isSearchable = true;
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
                this.dataLocations.isSearchable = true;
                this.deploymentInformation.isSearchable = true;
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
            if (typeof (this[index]) == "undefined") continue;
            this[index].value = fg.value[index];
        }
    }

    reset() {
        this.categories.isSearchable = false;
        this.certificates.isSearchable = false;
        this.dataLocations.isSearchable = false;
        this.deploymentInformation.isSearchable = false;
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

    constructor(object?) {
        this.isSearchable = false;
        this.value = false;
        if (typeof (object) != "undefined" && object != null) {
            if (typeof (object.isSearchable) == "boolean") {
                this.isSearchable = object.isSearchable;
            }
            if (typeof (object.value) == "boolean") {
                this.value = object.value;
            }
        }
    }
}


export class SearchVectorListEntry {

    public isSearchable: boolean;
    public value: number[];

    constructor(object?) {
        this.isSearchable = false;
        this.value = [];
        if (typeof (object) != "undefined" && object != null) {
            if (typeof (object.isSearchable) == "boolean") {
                this.isSearchable = object.isSearchable;
            }
            if (Array.isArray(object.value)) {
                this.value = object.value;
            }
        }
    }
}