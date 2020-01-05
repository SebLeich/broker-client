import { SessionState } from './metadata';
import { MatchingResponse, SearchVector } from './search';
import { ServiceCategory, Certificate, ServiceModel, DataLocation, DeploymentInformation, StorageType, Provider } from './service';

export class Project {
  id: number;
  projectTitle: string;
  projectDescription: string;
  created: string;
  lastModified: string;
  userId: string;
  minMatchingPercentage: number = 50;
  deleteOldSearches: boolean = true;
  matchingResponse: MatchingResponse[] = [];
  categories: ServiceCategory[] = [];
  certificates: Certificate[] = [];
  serviceModels: ServiceModel[] = [];
  dataLocations: DataLocation[] = [];
  deploymentInfos: DeploymentInformation[] = [];
  providers: Provider[] = [];
  storageTypes: StorageType[] = [];
  serviceTypes: string[] = [];
  sessionState: SessionState = new SessionState();
  icon: string = "layers";
  color: string = "grey";
  categoryPriority: number = 0;
  certificatePriority: number = 0;
  dataLocationPriority: number = 0;
  deploymentInfoPriority: number = 0;
  modelPriority: number = 0;
  providerPriority: number = 0;
  storageTypePriority: number = 0;
  fileEncryptionPriority: number = 0;
  hasFileEncryption: boolean;
  replicationPriority: number = 0;
  hasFileReplication: boolean;
  filePermissionsPriority: number = 0;
  hasFilePermissions: boolean;
  fileLockingPriority: number = 0;
  hasFileLocking: boolean;
  fileCompressionPriority: number = 0;
  hasFileCompression: boolean;
  dBMSPriority: number = 0;
  hasDBMS: boolean;
  fileVersioningPriority: number = 0;
  hasFileVersioning: boolean;
  automatedSynchronisationPriority: number = 0;
  hasAutomatedSynchronisation: boolean;
  constructor(object?) {
    if (object != null && typeof (object) != "undefined") {
      if(typeof(object.projectId) != "undefined" && object.projectId != null) this.id = object.projectId;
      if(typeof(object.projectTitle) != "undefined" && object.projectTitle != null) this.projectTitle = object.projectTitle;
      if(typeof(object.projectDescription) != "undefined" && object.projectDescription != null) this.projectDescription = object.projectDescription;
      if(typeof(object.created) != "undefined" && object.created != null) this.created = object.created;
      if(typeof(object.lastModified) != "undefined" && object.lastModified != null) this.lastModified = object.lastModified;
      if(typeof(object.userId) != "undefined" && object.userId != null) this.userId = object.userId;
      if(typeof(object.minMatchingPercentage) != "undefined" && object.minMatchingPercentage != null) this.minMatchingPercentage = object.minMatchingPercentage;
      if(typeof(object.deleteOldSearches) != "undefined" && object.deleteOldSearches != null) this.deleteOldSearches = object.deleteOldSearches;
      if(typeof(object.color) != "undefined" && object.color != null) this.color = object.color;
      if(typeof(object.categoryPriority) != "undefined" && object.categoryPriority != null) this.categoryPriority = object.categoryPriority;
      if(typeof(object.certificatePriority) != "undefined" && object.certificatePriority != null) this.certificatePriority = object.certificatePriority;
      if(typeof(object.dataLocationPriority) != "undefined" && object.dataLocationPriority != null) this.dataLocationPriority = object.dataLocationPriority;
      if(typeof(object.deploymentInfoPriority) != "undefined" && object.deploymentInfoPriority != null) this.deploymentInfoPriority = object.deploymentInfoPriority;
      if(typeof(object.modelPriority) != "undefined" && object.modelPriority != null) this.modelPriority = object.modelPriority;
      if(typeof(object.providerPriority) != "undefined" && object.providerPriority != null) this.providerPriority = object.providerPriority;
      if(typeof(object.storageTypePriority) != "undefined" && object.storageTypePriority != null) this.storageTypePriority = object.storageTypePriority;
      if(typeof(object.fileEncryptionPriority) != "undefined" && object.fileEncryptionPriority != null) this.fileEncryptionPriority = object.fileEncryptionPriority;
      if(typeof(object.hasFileEncryption) != "undefined" && object.hasFileEncryption != null) this.hasFileEncryption = object.hasFileEncryption;
      if(typeof(object.replicationPriority) != "undefined" && object.replicationPriority != null) this.replicationPriority = object.replicationPriority;
      if(typeof(object.hasFileReplication) != "undefined" && object.hasFileReplication != null) this.hasFileReplication = object.hasFileReplication;
      if(typeof(object.filePermissionsPriority) != "undefined" && object.filePermissionsPriority != null) this.filePermissionsPriority = object.filePermissionsPriority;
      if(typeof(object.hasFilePermissions) != "undefined" && object.hasFilePermissions != null) this.hasFilePermissions = object.hasFilePermissions;
      if(typeof(object.fileLockingPriority) != "undefined" && object.fileLockingPriority != null) this.fileLockingPriority = object.fileLockingPriority;
      if(typeof(object.hasFileLocking) != "undefined" && object.hasFileLocking != null) this.hasFileLocking = object.hasFileLocking;
      if(typeof(object.hasFileLocking) != "undefined" && object.hasFileLocking != null) this.hasFileLocking = object.hasFileLocking;
      if(typeof(object.fileCompressionPriority) != "undefined" && object.fileCompressionPriority != null) this.fileCompressionPriority = object.fileCompressionPriority;
      if(typeof(object.dBMSPriority) != "undefined" && object.dBMSPriority != null) this.dBMSPriority = object.dBMSPriority;
      if(typeof(object.hasDBMS) != "undefined" && object.hasDBMS != null) this.hasDBMS = object.hasDBMS;
      this.sessionState.isNew = false;
      if(typeof(object.fileVersioningPriority) != "undefined" && object.fileVersioningPriority != null) this.fileVersioningPriority = object.fileVersioningPriority;
      if(typeof(object.hasFileVersioning) != "undefined" && object.hasFileVersioning != null) this.hasFileVersioning = object.hasFileVersioning;
      if(typeof(object.automatedSynchronisationPriority) != "undefined" && object.automatedSynchronisationPriority != null) this.automatedSynchronisationPriority = object.automatedSynchronisationPriority;
      if(typeof(object.hasAutomatedSynchronisation) != "undefined" && object.hasAutomatedSynchronisation != null) this.hasAutomatedSynchronisation = object.hasAutomatedSynchronisation;
      for (var index in object.matchingResponse) {
        var o = object.matchingResponse[index];
        this.matchingResponse.push(new MatchingResponse(o));
      }
      for (var index in object.categories) {
        var o = object.categories[index];
        this.categories.push(new ServiceCategory(o));
      }
      for (var index in object.certificates) {
        var o = object.certificates[index];
        this.certificates.push(new Certificate(o));
      }
      for (var index in object.serviceModels) {
        var o = object.serviceModels[index];
        this.serviceModels.push(new ServiceModel(o));
      }
      for (var index in object.dataLocations) {
        var o = object.dataLocations[index];
        this.dataLocations.push(new DataLocation(o));
      }
      for (var index in object.deploymentInfos) {
        var o = object.deploymentInfos[index];
        this.deploymentInfos.push(new DeploymentInformation(o));
      }
      for (var index in object.providers) {
        var o = object.providers[index];
        this.providers.push(new Provider(o));
      }
      for (var index in object.storageTypes) {
        var o = object.storageTypes[index];
        this.storageTypes.push(new StorageType(o));
      }
      if(Array.isArray(object.serviceTypes)) this.serviceTypes = object.serviceTypes;
    } else {
      this.sessionState.isNew = true;
    }
  }
  /**
   * the method overwrites the project priorities with the search vector values
   */
  applySearchVector(
    searchVector: SearchVector,
    categories: ServiceCategory[],
    certificates: Certificate[],
    dataLocations: DataLocation[],
    deploymentInfos: DeploymentInformation[],
    providers: Provider[],
    storageTypes: StorageType[]
  ){
    if(searchVector.categories.isRelevant()){
      this.categoryPriority = searchVector.categories.priority;
      searchVector.categories.value.forEach((value) => {
        var cat = categories.find(x => x.id == value);
        if(cat != null && typeof(cat) != "undefined" && !this.categories.includes(cat)) this.categories.push(cat);
      });
    }
    if(searchVector.certificates.isRelevant()){
      this.certificatePriority = searchVector.certificates.priority;
      searchVector.certificates.value.forEach((value) => {
        var cert = certificates.find(x => x.id == value);
        if(cert != null && typeof(cert) != "undefined" && !this.certificates.includes(cert)) this.certificates.push(cert);
      });
    }
    if(searchVector.hasDBMS.isRelevant()){
      this.dBMSPriority = searchVector.hasDBMS.priority;
      this.hasDBMS = searchVector.hasDBMS.value;
    }
    if(searchVector.datalocations.isRelevant()){
      this.dataLocationPriority = searchVector.datalocations.priority;
      searchVector.datalocations.value.forEach((value) => {
        var dl = dataLocations.find(x => x.id == value);
        if(dl != null && typeof(dl) != "undefined" && !this.dataLocations.includes(dl)) this.dataLocations.push(dl);
      });
    }
    if(searchVector.deploymentinfos.isRelevant()){
      this.deploymentInfoPriority = searchVector.deploymentinfos.priority;
      searchVector.deploymentinfos.value.forEach((value) => {
        var di = deploymentInfos.find(x => x.id == value);
        if(di != null && typeof(di) != "undefined" && !this.deploymentInfos.includes(di)) this.deploymentInfos.push(di);
      });
    }
    if(searchVector.hasFileCompression.isRelevant()){
      this.fileCompressionPriority = searchVector.hasFileCompression.priority;
      this.hasFileCompression = searchVector.hasFileCompression.value;
    }
    if(searchVector.hasFileEncryption.isRelevant()){
      this.fileEncryptionPriority = searchVector.hasFileEncryption.priority;
      this.hasFileEncryption = searchVector.hasFileEncryption.value;
    }
    if(searchVector.hasFileLocking.isRelevant()){
      this.fileLockingPriority = searchVector.hasFileLocking.priority;
      this.hasFileLocking = searchVector.hasFileLocking.value;
    }
    if(searchVector.hasFilePermissions.isRelevant()){
      this.filePermissionsPriority = searchVector.hasFilePermissions.priority;
      this.hasFilePermissions = searchVector.hasFilePermissions.value;
    }
    if(searchVector.hasFileVersioning.isRelevant()){
      this.fileVersioningPriority = searchVector.hasFileVersioning.priority;
      this.hasFileVersioning = searchVector.hasFileVersioning.value;
    }
    if(searchVector.providers.isRelevant()){
      this.providerPriority = searchVector.providers.priority;
      searchVector.providers.value.forEach((value) => {
        var p = providers.find(x => x.id == value);
        if(p != null && typeof(p) != "undefined" && !this.providers.includes(p)) this.providers.push(p);
      });
    }
    if(searchVector.hasReplication.isRelevant()){
      this.replicationPriority = searchVector.hasReplication.priority;
      this.hasFileReplication = searchVector.hasReplication.value;
    }
    if(searchVector.storageType.isRelevant()){
      this.storageTypePriority = searchVector.storageType.priority;
      searchVector.storageType.value.forEach((value) => {
        var s = storageTypes.find(x => x.id == value);
        if(s != null && typeof(s) != "undefined" && !this.storageTypes.includes(s)) this.storageTypes.push(s);
      });
    }
    console.log(this.certificatePriority);
  }
  /**
   * the method returns whether the instance has searchable attributes
   */
  hasSearchValues(){
    if(this.automatedSynchronisationPriority > 0) return true;
    if(this.categoryPriority > 0) return true;
    if(this.certificatePriority > 0) return true;
    if(this.dBMSPriority > 0) return true;
    if(this.dataLocationPriority > 0) return true;
    if(this.deploymentInfoPriority > 0) return true;
    if(this.fileCompressionPriority > 0) return true;
    if(this.fileEncryptionPriority > 0) return true;
    if(this.fileLockingPriority > 0) return true;
    if(this.filePermissionsPriority > 0) return true;
    if(this.fileVersioningPriority > 0) return true;
    if(this.modelPriority > 0) return true;
    if(this.providerPriority > 0) return true;
    if(this.replicationPriority > 0) return true;
    if(this.storageTypePriority > 0) return true;
    return false;
  }
  /**
   * the method returns the server location
   */
  get location(): string{
    return Project.location;
  }
  /**
   * the method returns the server location
   */
  static get location(): string {
    return "api/project";
  }
  /**
   * the method returns the server location
   */
  sortedValues(){
    var output = [];
    if(this.automatedSynchronisationPriority > 0) output.push({
      value: this.automatedSynchronisationPriority,
      name: "Automatische Synchronisation",
    });
    if(this.categoryPriority > 0) output.push({
      value: this.categoryPriority,
      name: "Service Kategorie",
    });
    if(this.certificatePriority > 0) output.push({
      value: this.certificatePriority,
      name: "Zertifizierung",
    });
    if(this.dBMSPriority > 0) output.push({
      value: this.dBMSPriority,
      name: "Datenbankmanagementsystem",
    });
    if(this.dataLocationPriority > 0) output.push({
      value: this.dataLocationPriority,
      name: "Lokalisation",
    });
    if(this.deploymentInfoPriority > 0) output.push({
      value: this.deploymentInfoPriority,
      name: "Deployment",
    });
    if(this.fileCompressionPriority > 0) output.push({
      value: this.fileCompressionPriority,
      name: "Dateikomprimierung",
    });
    if(this.fileEncryptionPriority > 0) output.push({
      value: this.fileEncryptionPriority,
      name: "Dateiverschlüsselung",
    });
    if(this.fileLockingPriority > 0) output.push({
      value: this.fileLockingPriority,
      name: "Filelocking",
    });
    if(this.filePermissionsPriority > 0) output.push({
      value: this.filePermissionsPriority,
      name: "Dateiberechtigungen",
    });
    if(this.fileVersioningPriority > 0) output.push({
      value: this.fileVersioningPriority,
      name: "Dateiversionierung",
    });
    if(this.modelPriority > 0) output.push({
      value: this.modelPriority,
      name: "Servicemodell",
    });
    if(this.providerPriority > 0) output.push({
      value: this.providerPriority,
      name: "Anbieter",
    });
    if(this.replicationPriority > 0) output.push({
      value: this.replicationPriority,
      name: "Replikation",
    });
    if(this.storageTypePriority > 0) output.push({
      value: this.storageTypePriority,
      name: "Speicherart",
    });
    return output.sort((a, b) => {
      if(a.value < b.value) return 1;
      else if(a.value > b.value) return -1;
      else return 0;
    });
  }

  toServerObject(): any {
    return {
      "projectId": this.id,
      "projectTitle": this.projectTitle,
      "projectDescription": this.projectDescription,
      "userId": this.userId,
      "icon": this.icon,
      "color": this.color,
      "minMatchingPercentage": this.minMatchingPercentage,
      "deleteOldSearches": this.deleteOldSearches,
      "categoryPriority": this.categoryPriority,
      "certificatePriority": this.certificatePriority,
      "dataLocationPriority": this.dataLocationPriority,
      "deploymentInfoPriority": this.deploymentInfoPriority,
      "modelPriority": this.modelPriority,
      "providerPriority": this.providerPriority,
      "storageTypePriority": this.storageTypePriority,
      "fileEncryptionPriority": this.fileEncryptionPriority,
      "replicationPriority": this.replicationPriority,
      "filePermissionsPriority": this.fileEncryptionPriority,
      "fileLockingPriority": this.fileLockingPriority,
      "fileCompressionPriority": this.fileCompressionPriority,
      "dbmsPriority": this.dBMSPriority,
      "fileVersioningPriority": this.fileVersioningPriority,
      "automatedSynchronisationPriority": this.automatedSynchronisationPriority,
      "categories": this.categories,
      "certificates": this.certificates,
      "cloudServiceModels": this.serviceModels,
      "dataLocations": this.dataLocations,
      "deploymentInfos": this.deploymentInfos,
      "providers": this.providers,
      "storageTypes": this.storageTypes
    };
  }

  get total(): number {
    return (
      this.automatedSynchronisationPriority +
      this.categoryPriority +
      this.certificatePriority +
      this.dBMSPriority +
      this.dataLocationPriority +
      this.deploymentInfoPriority +
      this.fileCompressionPriority +
      this.fileEncryptionPriority +
      this.fileLockingPriority +
      this.filePermissionsPriority +
      this.fileVersioningPriority +
      this.modelPriority +
      this.providerPriority +
      this.replicationPriority +
      this.storageTypePriority
    );
  }

  valueMapping(){
    var output = [];
    if(this.categories.length > 0) output.push({ "category": "Kategorien", "value": this.categories });
    if(this.certificates.length > 0) output.push({ "category": "Zertifikate", "value": this.certificates });
    if(this.dataLocations.length > 0) output.push({ "category": "Lokalisierungen", "value": this.dataLocations });
    if(this.deploymentInfos.length > 0) output.push({ "category": "Deployment", "value": this.deploymentInfos });
    if(this.providers.length > 0) output.push({ "category": "Anbieter", "value": this.providers });
    if(this.serviceModels.length > 0) output.push({ "category": "Service Modelle", "value": this.serviceModels });
    if(this.serviceTypes.length > 0) output.push({ "category": "Zulässige Cloud Services", "value": this.serviceTypes });
    if(this.storageTypes.length > 0) output.push({ "category": "Speichertechnologie", "value": this.storageTypes });
    if(this.hasAutomatedSynchronisation) output.push({ "category": "Automatische Synchronisation", "value": ["Ja"] });
    if(this.hasDBMS) output.push({ "category": "Datenbankmanagementsystem", "value": ["Ja"] });
    if(this.hasFileCompression) output.push({ "category": "Dateikomprimierung", "value": ["Ja"] });
    if(this.hasFileEncryption) output.push({ "category": "Dateiverschlüsselung", "value": ["Ja"] });
    if(this.hasFileLocking) output.push({ "category": "Filelocking", "value": ["Ja"] });
    if(this.hasFilePermissions) output.push({ "category": "Dateiberechtigungen", "value": ["Ja"] });
    if(this.hasFileReplication) output.push({ "category": "Replikation", "value": ["Ja"] });
    if(this.hasFileVersioning) output.push({ "category": "Dateiversionierung", "value": ["Ja"] });
    return output;
  }
}