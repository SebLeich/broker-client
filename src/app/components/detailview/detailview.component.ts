import { Component, OnInit, Input } from '@angular/core';
import { Certificate, Service, ServiceCategory, ServiceProvider, ServiceModel, ServiceCertificate, ObjectStorageService, BlockStorageService, DirectAttachedService, KeyValueStorageService, StorageType } from "../../classes/service";
import { BackEndService } from "../../services/backend-service";
import * as globals from "../../globals";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSelectChange, MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})
export class DetailviewComponent implements OnInit {

  private _ser: Service[] = [];
  private _serCats: ServiceCategory[] = [];
  private _serMods: ServiceModel[] = [];
  private _serProv: ServiceProvider[] = [];
  private _serCert: Certificate[] = [];
  private _sTypes: StorageType[] = [];
  private _currentInd = 0;
  private _state: number = globals.viewStates.DEFAULT;

  public selectCategoryPlaceholder: string = "Service Kategorie";
  public selectProviderPlaceholder: string = "Service Provider";
  public selectServiceModelPlaceholder: string = "Service Modell";
  public selectStorageTypePlaceholder: string = "Speicherart";
  public showCategoryAdder: boolean = false;
  public showProviderAdder: boolean = false;
  public showServiceModelAdder: boolean = false;
  public showCertAdder: boolean = false;
  public showStorageTypeAdder: boolean = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() editMode = true;
  /**
   * the attribute contains whether the user is logged in or not
   */
  @Input() isLoggedIn;
  /**
   * the input value sets the internal use case list
   */
  @Input() set services(services: Service[]) {
    this._ser = services;
  }
  /**
   * the input value sets the service categories
   */
  @Input() set serviceCategories(categories: ServiceCategory[]) {
    this._serCats = categories;
  }
  /**
   * the input value sets the service models
   */
  set serviceModels(models: ServiceModel[]) {
    this._serMods = models;
  }
  /**
   * the input value sets the service models
   */
  set certificates(certs: Certificate[]) {
    this._serCert = certs;
  }
  /**
   * the input value sets the storage types
   */
  set storageTypes(sTypes: StorageType[]) {
    this._sTypes = sTypes;
  }
  /**
   * the input value sets the service providers
   */
  @Input() set serviceProviders(providers: ServiceProvider[]) {
    this._serProv = providers;
  }
  /**
   * the constructor creates a new instance of a detail view
   */
  constructor(private service: BackEndService) { }
  /**
   * the method adds a new certificate
   */
  addCertificate(name: string) {
    var c = new Certificate({ "certificateName": name });
    this.service.post(Certificate.location, c).subscribe((result) => {
      c = new Certificate(result);
      this._serCert.push(c);
      this.showCertAdder = false;
    });
  }
  /**
   * the method adds a new cloud service category
   */
  addServiceCategory(name: string) {
    var c = new ServiceCategory({ "cloudServiceCategoryName": name });
    this.service.post(ServiceCategory.location, c).subscribe((result) => {
      c = new ServiceCategory(result);
      this._serCats.push(c);
      this.showCategoryAdder = false;
    });
  }
  /**
   * the method adds a new service model
   */
  addServiceModel(name: string) {
    var m = new ServiceModel({ "cloudServiceModelName": name });
    this.service.post(ServiceModel.location, m).subscribe((result) => {
      m = new ServiceModel(result);
      this._serMods.push(m);
      this.showServiceModelAdder = false;
    });
  }
  /**
   * the method adds a new service provider
   */
  addServiceProvider(name: string) {
    var p = new ServiceProvider({ "providerName": name });
    this.service.post(ServiceProvider.location, p).subscribe((result) => {
      p = new ServiceProvider(result);
      this._serProv.push(p);
      this.showProviderAdder = false;
    });
  }
  /**
   * the method adds a new storage type
   */
  addStorageType(desc: string){
    var t = new StorageType({ "storageTypeDescription": desc });
    this.service.post(StorageType.location, t).subscribe((result) => {
      t = new StorageType(result);
      this._sTypes.push(t);
      this.showStorageTypeAdder = false;
    });
  }
  /**
   * the method returns the current service
   */
  get currentService(): any {
    return this._ser[this._currentInd];
  }
  /**
   * the method sets the current service
   */
  set currentService(service: any) {
    var oldObject = this._ser.find(x => x.id == service.id);
    if (typeof (oldObject) == "undefined") throw ("error");
    var i = this._ser.indexOf(oldObject);
    this._ser[i] = service;
    this._currentInd = i;
    console.log(this.currentService);
  }
  /**
   * the method returns all service categories
   */
  get serviceCategories(): ServiceCategory[] {
    return this._serCats;
  }
  /**
   * the method returns all storage types
   */
  get storageTypes(): StorageType[] {
    return this._sTypes;
  }
  /**
   * the method returns all service certificates
   */
  get certificates(): Certificate[] {
    return this._serCert;
  }
  /**
   * the method returns whether file encryption slider is visible
   */
  get displayFileEncryption(): boolean {
    if (
      this.currentService instanceof ObjectStorageService
      || this.currentService instanceof BlockStorageService
      || this.currentService instanceof DirectAttachedService
    ) return true;
    return false;
  }
  /**
   * the method returns whether DBMS slider is visible
   */
  get displayDBMS(): boolean {
    if (
      this.currentService instanceof KeyValueStorageService
    ) return true;
    return false;
  }
  /**
   * the method returns whether file locking slider is visible
   */
  get displayFileLocking(): boolean {
    if (
      this.currentService instanceof ObjectStorageService
      || this.currentService instanceof DirectAttachedService
    ) return true;
    return false;
  }
  /**
   * the method returns whether file permission slider is visible
   */
  get displayFilePermissions(): boolean {
    if (
      this.currentService instanceof ObjectStorageService
      || this.currentService instanceof DirectAttachedService
    ) return true;
    return false;
  }
  /**
   * the method returns whether file versioning slider is visible
   */
  get displayFileVersioning(): boolean {
    if (this.currentService instanceof ObjectStorageService) return true;
    return false;
  }
  /**
   * the method returns whether file compression slider is visible
   */
  get displayFileCompression(): boolean {
    if (
      this.currentService instanceof DirectAttachedService
    ) return true;
    return false;
  }
  /**
   * the method returns whether file replication slider is visible
   */
  get displayReplication(): boolean {
    if (
      this.currentService instanceof ObjectStorageService
      || this.currentService instanceof BlockStorageService
      || this.currentService instanceof DirectAttachedService
      || this.currentService instanceof KeyValueStorageService
    ) return true;
    return false;
  }
  /**
   * the method returns whether storage type slider is visible
   */
  get displayStorageType(): boolean {
    if (
      this.currentService instanceof DirectAttachedService
      || this.currentService instanceof BlockStorageService
    ) return true;
    return false;
  }
  /**
   * the function sets the file encryption value
   */
  set fileCompression(event: MatSlideToggleChange) {
    this.currentService.hasFileCompression = event.checked;
  }
  /**
   * the function sets the file encryption value
   */
  set fileEncryption(event: MatSlideToggleChange) {
    this.currentService.hasFileEncryption = event.checked;
  }
  /**
   * the function sets the file encryption value
   */
  set fileLocking(event: MatSlideToggleChange) {
    this.currentService.hasFileLocking = event.checked;
  }
  /**
   * the function sets the file encryption value
   */
  set filePermissions(event: MatSlideToggleChange) {
    this.currentService.hasFilePermissions = event.checked;
  }
  /**
   * the function sets the file encryption value
   */
  set fileVersioning(event: MatSlideToggleChange) {
    this.currentService.hasFileVersioning = event.checked;
  }
  /**
   * the function sets the file encryption value
   */
  set fileReplication(event: MatSlideToggleChange) {
    this.currentService.hasReplication = event.checked;
  }
  /**
   * the function sets the dbms value
   */
  set dbms(event: MatSlideToggleChange) {
    this.currentService.hasDBMS = event.checked;
  }
  /**
   * the method returns all service models
   */
  get serviceModels(): ServiceModel[] {
    return this._serMods;
  }
  /**
   * the method returns all service providers
   */
  get serviceProviders(): ServiceProvider[] {
    return this._serProv;
  }
  /**
   * the method sets the current service's certificates array
   */
  setCertificates(input: MatSelectChange) {
    var v = input.value;
    var a: ServiceCertificate[] = [];
    for (var index in v) {
      if (typeof (v[index]) == "undefined") continue;
      var c = this.certificates.find(x => x.id == v[index]);
      if (typeof (c) == "undefined") continue;
      a.push(new ServiceCertificate({
        "serviceId": this.currentService.id,
        "certificateId": c.id,
        "certificate": c
      }));
    }
    this.currentService.serviceCertificates = a;
  }
  /**
   * the method increases the current service pointer
   */
  next() {
    if (this.serviceCount - 1 > this._currentInd) {
      this._currentInd++;
    } else {
      this._currentInd = 0;
    }
  }
  /**
   * the method persists current changes
   */
  saveChanges() {
    this.state = globals.viewStates.WAITING;
    this.service.persistService(this.currentService).subscribe((result) => {
      this.state = globals.viewStates.READY;
      this.currentService = new this.currentService.constructor(result);
      console.log(this.currentService);
    });
  }
  /**
   * the method returns the current number of services
   */
  get serviceCount() {
    return this._ser.length;
  }
  /**
   * the method sets the component states
   */
  set state(state: number) {
    switch (state) {
      case globals.viewStates.WAITING:
        this._state = state;
        break;
      case globals.viewStates.READY:
        this._state = globals.viewStates.DEFAULT;
        this.editMode = false;
        break;
    }
  }
  /**
   * the method returns the components state
   */
  get state() {
    return this._state;
  }
  /**
   * the method toggles the edit mode (edit enabled/ disabled)
   */
  toggleReadOnly() {
    if (this.editMode) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
    this.service.get(ServiceCategory.location).subscribe((o) => {
      var array = [];
      for (var index in o) {
        array.push(new ServiceCategory(o[index]));
      }
      this.serviceCategories = array;
    });
    this.service.get(ServiceModel.location).subscribe((o) => {
      var array = [];
      for (var index in o) {
        array.push(new ServiceModel(o[index]));
      }
      this.serviceModels = array;
    });
    this.service.get(Certificate.location).subscribe((o) => {
      var array = [];
      for (var index in o) {
        array.push(new Certificate(o[index]));
      }
      this.certificates = array;
    });
    if(this.displayStorageType){
      this.service.get(StorageType.location).subscribe((o) => {
        var array = [];
        for (var index in o) {
          array.push(new StorageType(o[index]));
        }
        this.storageTypes = array;
      });
    }
  }
}
