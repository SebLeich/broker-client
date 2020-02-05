import { SessionState } from './metadata';
import { MatchingResponse, SearchVector } from './search';
import {
  Certificate, 
  ServiceModel, 
  DataLocation, 
  DeploymentInformation, 
  StorageType, 
  Provider
} from './service';
import { Feature } from './feature';

export class Project {
  id: number = 0;
  projectTitle: string;
  projectDescription: string;
  created: string;
  lastModified: string;
  userId: string;
  minMatchingPercentage: number = 50;
  deleteOldSearches: boolean = true;
  matchingResponse: MatchingResponse[] = [];
  certificates: Certificate[] = [];
  features: Feature[] = [];
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
  featurePriority: number = 0;
  modelPriority: number = 0;
  providerPriority: number = 0;
  storageTypePriority: number = 0;
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
      if(typeof(object.featurePriority) != "undefined" && object.featurePriority != null) this.featurePriority = object.featurePriority;
      if(typeof(object.storageTypePriority) != "undefined" && object.storageTypePriority != null) this.storageTypePriority = object.storageTypePriority;
      for (var index in object.matchingResponse) {
        var o = object.matchingResponse[index];
        this.matchingResponse.push(new MatchingResponse(o));
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
      for (var index in object.features) {
        var o = object.features[index];
        this.features.push(new Feature(o));
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
    certificates: Certificate[],
    dataLocations: DataLocation[],
    deploymentInfos: DeploymentInformation[],
    features: Feature[],
    providers: Provider[],
    storageTypes: StorageType[],
    serviceModels: ServiceModel[]
  ){
    if(searchVector.certificates.isRelevant()){
      this.certificatePriority = searchVector.certificates.priority;
      searchVector.certificates.value.forEach((value) => {
        var cert = certificates.find(x => x.id == value);
        if(cert != null && typeof(cert) != "undefined" && !this.certificates.includes(cert)) this.certificates.push(cert);
      });
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
    if(searchVector.features.isRelevant()){
      this.featurePriority = searchVector.features.priority;
      searchVector.features.value.forEach((value) => {
        var f = features.find(x => x.id == value);
        if(f != null && typeof(f) != "undefined" && !this.features.includes(f)) this.features.push(f);
      });
    }
    if(searchVector.providers.isRelevant()){
      this.providerPriority = searchVector.providers.priority;
      searchVector.providers.value.forEach((value) => {
        var p = providers.find(x => x.id == value);
        if(p != null && typeof(p) != "undefined" && !this.providers.includes(p)) this.providers.push(p);
      });
    }
    if(searchVector.storageType.isRelevant()){
      this.storageTypePriority = searchVector.storageType.priority;
      searchVector.storageType.value.forEach((value) => {
        var s = storageTypes.find(x => x.id == value);
        if(s != null && typeof(s) != "undefined" && !this.storageTypes.includes(s)) this.storageTypes.push(s);
      });
    }
    if(searchVector.models.isRelevant()){
      this.modelPriority = searchVector.models.priority;
      searchVector.models.value.forEach((value) => {
        var m = serviceModels.find(x => x.id == value);
        if(m != null && typeof(m) != "undefined" && !this.serviceModels.includes(m)) this.serviceModels.push(m);
      });
    }
  }
  /**
   * the method returns whether the instance has searchable attributes
   */
  hasSearchValues(){
    if(this.categoryPriority > 0) return true;
    if(this.certificatePriority > 0) return true;
    if(this.dataLocationPriority > 0) return true;
    if(this.deploymentInfoPriority > 0) return true;
    if(this.modelPriority > 0) return true;
    if(this.providerPriority > 0) return true;
    if(this.featurePriority > 0) return true;
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
    if(this.categoryPriority > 0) output.push({
      value: this.categoryPriority,
      name: "Service Kategorie",
    });
    if(this.certificatePriority > 0) output.push({
      value: this.certificatePriority,
      name: "Zertifizierung",
    });
    if(this.dataLocationPriority > 0) output.push({
      value: this.dataLocationPriority,
      name: "Lokalisation",
    });
    if(this.deploymentInfoPriority > 0) output.push({
      value: this.deploymentInfoPriority,
      name: "Deployment",
    });
    if(this.featurePriority > 0) output.push({
      value: this.featurePriority,
      name: "Features",
    });
    if(this.modelPriority > 0) output.push({
      value: this.modelPriority,
      name: "Servicemodell",
    });
    if(this.providerPriority > 0) output.push({
      value: this.providerPriority,
      name: "Anbieter",
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
      "featurePriority": this.featurePriority,
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
      this.categoryPriority +
      this.certificatePriority +
      this.dataLocationPriority +
      this.deploymentInfoPriority +
      this.featurePriority +
      this.modelPriority +
      this.providerPriority +
      this.storageTypePriority
    );
  }

  valueMapping(){
    var output = [];
    if(this.certificates.length > 0) output.push({ "category": "Zertifikate", "value": this.certificates });
    if(this.dataLocations.length > 0) output.push({ "category": "Lokalisierungen", "value": this.dataLocations });
    if(this.deploymentInfos.length > 0) output.push({ "category": "Deployment", "value": this.deploymentInfos });
    if(this.providers.length > 0) output.push({ "category": "Anbieter", "value": this.providers });
    if(this.serviceModels.length > 0) output.push({ "category": "Service Modelle", "value": this.serviceModels });
    if(this.serviceTypes.length > 0) output.push({ "category": "Zulässige Cloud Services", "value": this.serviceTypes });
    if(this.storageTypes.length > 0) output.push({ "category": "Speichertechnologie", "value": this.storageTypes });
    if(this.featurePriority) output.push({ "category": "Features", "value": this.features });
    return output;
  }
}