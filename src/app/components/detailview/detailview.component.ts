import { Component, OnInit, Input } from '@angular/core';
import { Service, ServiceCategory, ServiceProvider } from "../../classes/service";
import { BackEndService } from "../../services/backend-service";
import * as globals from "../../globals";

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})
export class DetailviewComponent implements OnInit {

  private _ser: Service[] = [];
  private _serCats: ServiceCategory[] = [];
  private _serProv: ServiceProvider[] = [];
  private _currentInd = 0;
  private _state: number = globals.viewStates.DEFAULT;

  public selectCategoryPlaceholder: string = "Service Kategorie";
  public selectProviderPlaceholder: string = "Service Provider";
  public showCategoryAdder: boolean = false;
  public showProviderAdder: boolean = false;

  @Input() editMode = false;
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
   * the method adds a new cloud service category
   */
  addServiceCategory(name: string){
    var c = new ServiceCategory({ "cloudServiceCategoryName": name });
    this.service.post(ServiceCategory.location, c).subscribe((result) => {
      c = new ServiceCategory(result);
      this._serCats.push(c);
      this.showCategoryAdder = false;
    });
  }
  /**
   * the method adds a new service provider
   */
  addServiceProvider(name: string){
    var p = new ServiceProvider({ "providerName": name });
    this.service.post(ServiceProvider.location, p).subscribe((result) => {
      p = new ServiceProvider(result);
      this._serProv.push(p);
      this.showProviderAdder = false;
    });
  }
  /**
   * the method returns the current service
   */
  get currentService(): Service {
    return this._ser[this._currentInd];
  }
  /**
   * the method returns all service categories
   */
  get serviceCategories(): ServiceCategory[] {
    return this._serCats;
  }
  /**
   * the method returns all service providers
   */
  get serviceProviders(): ServiceProvider[] {
    return this._serProv;
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
    console.log(this.currentService);
    this.service.persistService(this.currentService).subscribe((result) => {
      console.log(result);
      this.state = globals.viewStates.READY;
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
  }
}
