import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopUpData } from "src/app/components/pop-up/pop-up.component";
import { Certificate, ServiceCategory, ServiceModel, ObjectStorageService, BlockStorageService, DirectAttachedService, KeyValueStorageService, StorageType, DataLocation, Provider, DataLocationType } from "../../classes/service";
import { BackEndService } from "../../services/backend-service";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSelectChange, MatSlideToggleChange } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-edit-view-inner',
  templateUrl: './service-edit-view-inner.component.html',
  styleUrls: ['./service-edit-view-inner.component.css']
})
export class ServiceEditViewInnerComponent implements OnInit {

  private _serCats: ServiceCategory[] = [];
  private _serMods: ServiceModel[] = [];
  private _providers: Provider[] = [];
  private _serCert: Certificate[] = [];
  private _sTypes: StorageType[] = [];
  private _dataLocations: DataLocation[] = [];
  private _dataLocationTypes: DataLocationType[] = [];

  public selectCategoryPlaceholder: string = "Service Kategorie";
  public selectProviderPlaceholder: string = "Anbieter";
  public selectServiceModelPlaceholder: string = "Service Modell";
  public selectStorageTypePlaceholder: string = "Speicherart";
  public selectDataLocationPlaceholder: string = "Lokalisierung";
  public showCategoryAdder: boolean = false;
  public showDataLocationAdder: boolean = false;
  public showDataLocationTypeAdder: boolean = false;
  public showProviderAdder: boolean = false;
  public showServiceModelAdder: boolean = false;
  public showCertAdder: boolean = false;
  public showStorageTypeAdder: boolean = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public fg: FormGroup;

  /**
   * the components current service
   */
  @Input() public currentService: any;
  /**
   * the input value sets the service categories
   */
  @Input() set serviceCategories(categories: ServiceCategory[]) {
    this._serCats = categories;
  }
  /**
   * the emitter for the state
   */
  @Output() messageEmitter = new EventEmitter<PopUpData>();
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
   * the input value sets all providers
   */
  @Input() set providers(providers: Provider[]) {
    this._providers = providers;
  }
  /**
   * the method returns all providers
   */
  get providers(): Provider[] {
    return this._providers;
  }
  /**
   * the constructor creates a new instance of a detail view
   */
  constructor(
    private service: BackEndService,
    private _formBuilder: FormBuilder
  ) {
    this.certificateFg = _formBuilder.group({
      "certificateName": ['', Validators.required]
    });
    this.dataLocationFg = _formBuilder.group({
      "dataLocationName": ['', Validators.required],
      "dataLocationType": ['', Validators.required]
    });
    this.dataLocationTypeFg = _formBuilder.group({
      "typeName": ['', Validators.required]
    });
    this.providerFg = _formBuilder.group({
      "providerName": ['', Validators.required],
      "providerUrl": ['']
    });
    this.serviceCategoryFg = _formBuilder.group({
      "cloudServiceCategoryName": ['', Validators.required]
    });
    this.serviceModelFg = _formBuilder.group({
      "cloudServiceModelName": ['', Validators.required]
    })
    this.storageTypeFg = _formBuilder.group({
      "storageTypeDescription": ['', Validators.required]
    });
  }
  /**
   * the method adds a new certificate
   */
  addCertificate() {
    if(this.certificateFg.invalid) this.messageEmitter.emit({
      message: "Zertifikat kann nicht angelegt werden",
      icon: "clear",
      iconClass: "danger",
      showSpinner: false
    });
    this.messageEmitter.emit({
      message: "Zertifikat wird angelegt",
      icon: null,
      iconClass: null,
      showSpinner: true
    });
    var c = new Certificate({ "certificateName": this.certificateFg.get("certificateName").value });
    this.service.post(Certificate.location, c).subscribe((result) => {
      c = new Certificate(result);
      this._serCert.push(c);
      this.showCertAdder = false;
      this.certificateFg.reset();
      this.messageEmitter.emit({
        message: "Zertifikat wurde angelegt",
        icon: "done",
        iconClass: "success",
        showSpinner: false
      });
    });
  }
  /**
   * the method adds a new data location
   */
  addDataLocation() {
    if(this.dataLocationFg.invalid) this.messageEmitter.emit({
      message: "Lokalisation kann nicht angelegt werden",
      icon: "clear",
      iconClass: "danger",
      showSpinner: false
    });
    this.messageEmitter.emit({
      message: "Lokalisation wird angelegt",
      icon: null,
      iconClass: null,
      showSpinner: true
    });
    var l = new DataLocation({
      "dataLocationName": this.dataLocationFg.get("dataLocationName").value,
      "dataLocationType": this._dataLocationTypes.find(x => x.id == this.dataLocationFg.get("dataLocationType").value)
    });
    this.service.post(DataLocation.location, l).subscribe((result) => {
      l = new DataLocation(result);
      this._dataLocations.push(l);
      this.showDataLocationAdder = false;
      this.dataLocationFg.reset();
      this.messageEmitter.emit({
        message: "Lokalisation wurde angelegt",
        icon: "done",
        iconClass: "success",
        showSpinner: false
      });
    });
  }
  /**
   * the method adds a new data location type
   */
  addDataLocationType() {
    if(this.dataLocationTypeFg.invalid) this.messageEmitter.emit({
      message: "Lokalisationsart kann nicht angelegt werden",
      icon: "clear",
      iconClass: "danger",
      showSpinner: false
    });
    this.messageEmitter.emit({
      message: "Lokalisationsart wird angelegt",
      icon: null,
      iconClass: null,
      showSpinner: true
    });
    var t = new DataLocationType({ "typeName": this.dataLocationTypeFg.get("typeName").value });
    this.service.post(DataLocationType.location, t).subscribe((result) => {
      t = new DataLocationType(result);
      this._dataLocationTypes.push(t);
      this.showDataLocationTypeAdder = false;
      this.dataLocationTypeFg.reset();
      this.messageEmitter.emit({
        message: "Lokalisationsart wurde angelegt",
        icon: "done",
        iconClass: "success",
        showSpinner: false
      });
    });
  }
  /**
   * the method adds a new cloud service category
   */
  addServiceCategory() {
    if(this.dataLocationTypeFg.invalid) this.messageEmitter.emit({
      message: "Kategorie kann nicht angelegt werden",
      icon: "clear",
      iconClass: "danger",
      showSpinner: false
    });
    this.messageEmitter.emit({
      message: "Kategorie wird angelegt",
      icon: null,
      iconClass: null,
      showSpinner: true
    });
    var c = new ServiceCategory({ "cloudServiceCategoryName": this.serviceCategoryFg.get("cloudServiceCategoryName").value });
    this.service.post(ServiceCategory.location, c).subscribe((result) => {
      c = new ServiceCategory(result);
      this._serCats.push(c);
      this.showCategoryAdder = false;
      this.serviceCategoryFg.reset();
      this.messageEmitter.emit({
        message: "Kategorie wurde angelegt",
        icon: "done",
        iconClass: "success",
        showSpinner: false
      });
    });
  }
  /**
   * the method adds a new service model
   */
  addServiceModel() {
    if(this.serviceModelFg.invalid) this.messageEmitter.emit({
      message: "Service Modell kann nicht angelegt werden",
      icon: "clear",
      iconClass: "danger",
      showSpinner: false
    });
    this.messageEmitter.emit({
      message: "Servicemodell wird angelegt",
      icon: null,
      iconClass: null,
      showSpinner: true
    });
    var m = new ServiceModel({ "cloudServiceModelName": this.serviceModelFg.get("cloudServiceModelName").value });
    this.service.post(ServiceModel.location, m).subscribe((result) => {
      m = new ServiceModel(result);
      this._serMods.push(m);
      this.showServiceModelAdder = false;
      this.serviceModelFg.reset();
      this.messageEmitter.emit({
        message: "Servicemodell wurde angelegt",
        icon: "done",
        iconClass: "success",
        showSpinner: false
      });
    });
  }
  /**
   * the method adds a new service provider
   */
  addProvider() {
    if(this.providerFg.invalid) this.messageEmitter.emit({
      message: "Anbieter kann nicht angelegt werden",
      icon: "clear",
      iconClass: "danger",
      showSpinner: false
    });
    this.messageEmitter.emit({
      message: "Anbieter wird angelegt",
      icon: null,
      iconClass: null,
      showSpinner: true
    });
    var p = new Provider({
      "providerName": this.providerFg.get("providerName").value,
      "url": this.providerFg.get("providerUrl").value
    });
    this.service.post(Provider.location, p).subscribe((result) => {
      p = new Provider(result);
      this._providers.push(p);
      this.showProviderAdder = false;
      this.providerFg.reset();
      this.messageEmitter.emit({
        message: "Anbieter wurde angelegt",
        icon: "done",
        iconClass: "success",
        showSpinner: false
      });
    });
  }
  /**
   * the method adds a new storage type
   */
  addStorageType(){
    if(this.storageTypeFg.invalid) this.messageEmitter.emit({
      message: "Speicherart kann nicht angelegt werden",
      icon: "clear",
      iconClass: "danger",
      showSpinner: false
    });
    this.messageEmitter.emit({
      message: "Speicherart wird angelegt",
      icon: null,
      iconClass: null,
      showSpinner: true
    });
    var t = new StorageType({ "storageTypeDescription": this.storageTypeFg.get("storageTypeDescription").value });
    this.service.post(StorageType.location, t).subscribe((result) => {
      t = new StorageType(result);
      this._sTypes.push(t);
      this.showStorageTypeAdder = false;
      this.storageTypeFg.reset();
      this.messageEmitter.emit({
        message: "Speicherart wurde angelegt",
        icon: "done",
        iconClass: "success",
        showSpinner: false
      });
    });
  }
  /**
   * the method returns all data locations
   */
  get dataLocations(): DataLocation[] {
    return this._dataLocations;
  }
  /**
   * the method sets all data locations
   */
  set dataLocations(dataLocations: DataLocation[]) {
    this._dataLocations = dataLocations;
  }
  /**
   * the method returns all data location types
   */
  get dataLocationTypes(): DataLocationType[] {
    return this._dataLocationTypes;
  }
  /**
   * the method sets all data location types
   */
  set dataLocationTypes(dataLocationTypes: DataLocationType[]) {
    this._dataLocationTypes = dataLocationTypes;
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
    if(this.currentService == null) return false;
    switch(this.currentService.constructor){
      case DirectAttachedService:
      case BlockStorageService:
        return true;
    }
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
   * the method sets the current service's certificates array
   */
  setCertificates(input: MatSelectChange) {
    var v = input.value;
    var a: Certificate[] = [];
    for (var index in v) {
      if (typeof (v[index]) == "undefined") continue;
      var c = this.certificates.find(x => x.id == v[index]);
      if (typeof (c) == "undefined") continue;
      a.push(c);
    }
    this.currentService.certificates = a;
  }
  /**
   * the method sets the current service's certificates array
   */
  setDataLocations(input: MatSelectChange) {
    var v = input.value;
    var a: DataLocation[] = [];
    for (var index in v) {
      if (typeof (v[index]) == "undefined") continue;
      var l = this.dataLocations.find(x => x.id == v[index]);
      if (typeof (l) == "undefined") continue;
      a.push(l);
    }
    this.currentService.dataLocations = a;
  }
  /**
   * the method persists current changes
   */
  saveChanges() {
    console.log(this.currentService);
    //this.persistService.emit(this.currentService);
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
    this.fg = this._formBuilder.group({
      
    });
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
    this.service.get(DataLocation.location).subscribe((o) => {
      var array = [];
      for (var index in o) {
        array.push(new DataLocation(o[index]));
      }
      this.dataLocations = array;
    });
    this.service.get(DataLocationType.location).subscribe((o) => {
      var array = [];
      for (var index in o) {
        array.push(new DataLocationType(o[index]));
      }
      this.dataLocationTypes = array;
    });
    this.service.get(StorageType.location).subscribe((o) => {
      var array = [];
      for (var index in o) {
        array.push(new StorageType(o[index]));
      }
      this.storageTypes = array;
    });
  }

  // AFTER THIS: new object creation attributes & functions

  public certificateFg: FormGroup;
  public dataLocationFg: FormGroup;
  public dataLocationTypeFg: FormGroup;
  public providerFg: FormGroup;
  public serviceCategoryFg: FormGroup;
  public serviceModelFg: FormGroup;
  public storageTypeFg: FormGroup;

  get newCertificateName(){
    return this.certificateFg.get("certificateName");
  }

  get newDataLocationName(){
    return this.dataLocationFg.get("dataLocationName");
  }

  get newDataLocationType(){
    return this.dataLocationFg.get("dataLocationType");
  }

  get newDataLocationTypeName(){
    return this.dataLocationTypeFg.get("typeName");
  }

  get newProviderName(){
    return this.providerFg.get("providerName");
  }

  get newServiceModelName(){
    return this.serviceModelFg.get("cloudServiceModelName");
  }

  get newServiceCategoryName(){
    return this.serviceCategoryFg.get("cloudServiceCategoryName");
  }

  get newStorageTypeDescription(){
    return this.storageTypeFg.get("storageTypeDescription");
  }

}
