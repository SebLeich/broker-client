import { Component, OnInit } from "@angular/core";
import * as globals from "../../globals";
import { Project } from "../../classes/project";
import {
  Certificate,
  Service,
  ServiceCategory,
  Provider,
  DeploymentInformation,
  DataLocation,
  ServiceModel,
  StorageType
} from "../../classes/service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { RegisterComponent } from "../register/register.component";
import { UseCase } from "../../classes/use-case";
import { BackEndService } from "../../services/backend-service";
import { LoginComponent } from "src/app/components/login/login.component";
import { PopUpComponent, PopUpData } from "src/app/components/pop-up/pop-up.component";
import { RoleRight, User } from "src/app/classes/account";
import { UserDetailComponent } from "../user-detail/user-detail.component";
import { SearchVector, MatchingResponse } from "src/app/classes/search";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"]
})
/**
 * the class contains the main application component
 */
export class RootComponent implements OnInit {
  errorMsg: string = "";
  errorInner: string = "";
  errorState: number = 0;
  /**
   * the attribute contains the current application state
   */
  state: number = globals.rootStates.STARTPAGE;
  /**
   * obsolet?
   */
  loginState: number = globals.loginStates.CLOSED;

  projectPointer: number = 0;

  certificates: Certificate[] = [];
  dataLocations: DataLocation[] = [];
  deploymentInformation: DeploymentInformation[] = [];
  projects: Project[] = [];
  useCases: UseCase[] = [];
  services: Service[] = [];
  roleRights: RoleRight[] = [];
  serviceCategories: ServiceCategory[] = [];
  serviceModels: ServiceModel[] = [];
  providers: Provider[] = [];
  storageTypes: StorageType[] = [];

  currentMatchingResponse: MatchingResponse = null;

  public currentService: any;

  /**
   * the constructor creates a new instance of the component
   */
  constructor(
    private _dialog: MatDialog, 
    private _service: BackEndService,
    private _snackBar: MatSnackBar
  ) {

  }
  /**
   * the attribute returns whether the current user is allowed to create services
   */
  get canCreateServices() {
    if (
      this.roleRights.find(
        x => x.rule.ruleCode == "create-services" && x.isAllowed
      )
    )
      return true;
    return false;
  }
  /**
   * the attribute returns whether the current user is allowed to create services
   */
  get canDeleteServices() {
    if (
      this.roleRights.find(
        x => x.rule.ruleCode == "delete-services" && x.isAllowed
      )
    )
      return true;
    return false;
  }
  /**
   * the attribute returns whether the current user can administrate
   */
  get canAdministrate() {
    if (this.canEditSecurityGuidelines || this.canRegisterRoles) return true;
    return false;
  }
  /**
   * the attribute returns whether the current user can edit security guidelines
   */
  get canEditSecurityGuidelines() {
    if (
      this.roleRights.find(
        x => x.rule.ruleCode == "edit-security-guidelines" && x.isAllowed
      )
    )
      return true;
    return false;
  }
  /**
   * the attribute returns whether the current user is allowed to create roles
   */
  get canRegisterRoles() {
    if (
      this.roleRights.find(
        x => x.rule.ruleCode == "register-roles" && x.isAllowed
      )
    )
      return true;
    return false;
  }
  /**
   * the method returns the current project
   */
  get currentProject(): Project {
    var p = this.projects.find(x => x.id == this.projectPointer);
    if (typeof (p) == "undefined") return null;
    return p;
  }
  /**
   * the method sets the current project
   */
  set currentProject(project: Project) {
    var p = this.projects.find(x => x.id == project.id);
    if (typeof (p) == "undefined") this.projects.push(project);
    this.projectPointer = project.id;
  }
  /**
   * the method returns the current projects matching responses
   */
  get currentMatchingResponses(): MatchingResponse[] {
    if (this.currentProject == null) return [];
    return this.currentProject.matchingResponse;
  }
  /**
   * the method returns the current project counter
   */
  get projectCounter(): number {
    return this.projects.length;
  }
  /**
   * the method removes a matching response from the database
   */
  deleteMatchingResponse(response: MatchingResponse) {
    this._service.delete(MatchingResponse.location + "/" + response.id).subscribe((result) => {
      var p = this.projects.find(x => x.id == response.projectId);
      if (p != null && typeof (p) != "undefined") {
        var i = p.matchingResponse.indexOf(response);
        if (i > -1) p.matchingResponse.splice(i, 1);
      }
    });
  }
  /**
   * the method shows the service detail view
   */
  editService(service: Service) {
    this.currentService = service;
    this.setState(globals.rootStates.SERVICEDETAILVIEW);
  }
  /**
   * the method shows the project edit view
   */
  editProject(project: Project) {
    this.currentProject = project;
    this.setState(globals.rootStates.PROJECTEDITVIEW);
  }
  /**
   * the method navigates to the use case selection view
   */
  gotoUseCaseSelection() {
    this.setState(globals.rootStates.USECASESELECTION);
  }
  /**
   * the method navigates to the matching response detail view
   */
  gotoMatchingResponseDetailView(matchingResponse: MatchingResponse){
    this.currentMatchingResponse = matchingResponse;
    this.setState(globals.rootStates.MATCHINGRESPONSEDETAILVIEW);
  }
  /**
   * the method navigates to the matching response overview
   */
  gotoMatchingResponseOverView(){
    this.setState(globals.rootStates.MATCHINGRESPONSEOVERVIEW);
  }
  /**
   * the method navigates to the project detail view
   */
  gotoProjectDetailView(project: Project) {
    this.currentProject = project;
    this.setState(globals.rootStates.PROJECTDETAILVIEW);
  }
  /**
   * the method navigates to the project detail view
   */
  gotoProjectEditView(project: Project) {
    this.currentProject = project;
    this.setState(globals.rootStates.PROJECTEDITVIEW);
  }
  /**
   * the method navigates to the project detail view
   */
  gotoProjectOverview() {
    this.setState(globals.rootStates.PROJECTOVERVIEW);
  }
  /**
   * the method navigates to the service preview
   */
  showService(service: Service) {
    this.services = [service];
    this.setState(globals.rootStates.MATCHINGRESPONSEOVERVIEW);
  }
  /**
   * the method persists a given service
   */
  persistService(service: any) {
    this.popUp = {
      message: "Der Service wird gespeichert",
      icon: null,
      iconClass: null,
      showSpinner: true
    };
    this._service.persistService(service).subscribe((result: any) => {
      if(service.sessionState.isNew){
        this.popUp = {
          message: "Der Service wurde angelegt",
          icon: "done",
          iconClass: "success",
          showSpinner: false
        };
      } else {
        this.popUp = {
          message: "Die Änderungen wurden gespeichert",
          icon: "done",
          iconClass: "success",
          showSpinner: false
        };
      }
      this.currentService = new service.constructor(result);
      this.setState(globals.rootStates.SERVICEDETAILVIEW);
    });
  }
  /**
   * the method persists a given service
   */
  persistProject(project: Project) {
    this.popUp = {
      message: "Das Projekt wird gespeichert",
      icon: null,
      iconClass: null,
      showSpinner: true
    };
    this._service.persistProject(project).subscribe((result) => {
      console.log(result);
      if(project.matchingResponse.length == 0){
        project = new Project(result);
        this.popUp = {
          message: "Das Projekt wurde angelegt",
          icon: "done",
          iconClass: "success",
          showSpinner: false
        };
      } else {
        for(var element of project.matchingResponse) element.projectId = result.projectId;
        this._service.post(Project.location + "/matchingresponses", project.matchingResponse).subscribe((result2) => {
          console.log(result2);
          project = new Project(result2);
          this.popUp = {
            message: "Das Projekt wurde angelegt",
            icon: "done",
            iconClass: "success",
            showSpinner: false
          };
        });
      }
    });
  }
  /**
   * the method sets the pop up data
   */
  set popUp(data: PopUpData){
    this._snackBar.openFromComponent(PopUpComponent, {
      duration: 2000,
      data: data
    });
  }
  /**
   * the method checks whether the current user is logged in
   */
  get isLoggedIn() {
    var token = this.token;
    if (token == null || typeof token == "undefined") return false;
    return true;
  }
  /**
   * the method is called after the successful login
   */
  loginCallback(result) {
    this.token = result.access_token;
    this.username = result.userName;
    this.popUp = {
      message: "Willkommen " + result.userName,
      icon: "done",
      iconClass: "success",
      showSpinner: false
    };
    this._service.get("api/account/current-rights").subscribe(
      result => {
        this.roleRights = [];
        for (var index in result) {
          this.roleRights.push(new RoleRight(result[index]));
        }
      },
      error => {
        if (error.status == 401) {
          this.autoLogout();
        }
      }
    );
  }
  /**
   * the method logs the current user out caused by token expiration
   */
  autoLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    this.roleRights = [];
    this.popUp = { message: "Logout wegen Zeitüberschreitung", icon: null, iconClass: null, showSpinner: false };
  }
  /**
   * the method logs the current user out
   */
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    this.roleRights = [];
    this.popUp = { message: "Sie wurden ausgeloggt", icon: "done", iconClass: "success", showSpinner: false };
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
    this._service.getUseCases().subscribe((o: Object) => this.setUseCases(o));
    this._service
      .get(Certificate.location)
      .subscribe((o: Object) => this.setCertificates(o));
    this._service
      .get(Project.location + "/current")
      .subscribe((o: Object) => this.setCurrentProjects(o));
    this._service
      .get(DataLocation.location)
      .subscribe((o: Object) => this.setDataLocations(o));
    this._service
      .get(DeploymentInformation.location)
      .subscribe((o: Object) => this.setDeploymentInformation(o));
    this._service
      .get(ServiceCategory.location)
      .subscribe((o: Object) => this.setServiceCategories(o));
    this._service
      .get(ServiceModel.location)
      .subscribe((o: Object) => this.setServiceModels(o));
    this._service
      .get(Provider.location)
      .subscribe((o: Object) => this.setProviders(o));
    this._service
      .get(StorageType.location)
      .subscribe((o: Object) => this.setStorageTypes(o));
    if (this.isLoggedIn) {
      this._service.get("api/account/current-rights").subscribe(
        result => {
          for (var index in result) {
            this.roleRights.push(new RoleRight(result[index]));
          }
        },
        error => {
          if (error.status == 401) {
            this.logout();
          }
        }
      );
    }
  }
  /**
   * the method is called when the user sends his use case search
   */
  sendSearch(s: SearchVector) {
    this.state = globals.rootStates.WAITING;
    var p = this.currentProject;
    if (p == null) {
      p = new Project();
      p.applySearchVector(
        s, 
        this.serviceCategories, 
        this.certificates, 
        this.dataLocations, 
        this.deploymentInformation, 
        this.providers, 
        this.storageTypes, 
        this.serviceModels
      );
      p.sessionState.isNew = true;
      this.projects.push(p);
      this.projectPointer = p.id;
    } else if(p.deleteOldSearches){
      p.matchingResponse = [];
    }
    console.log(p);
    for (var index in s.types) {
      var t = s.types[index];
      this._service.sendSearch(t, s,
        (result: MatchingResponse[]) => {
          var p = this.currentProject;
          p.sessionState.isChanged = true;
          for(let m of result){
            m.projectId = p.id;
            p.matchingResponse.push(m);
          }
          this.setState(globals.rootStates.MATCHINGRESPONSEOVERVIEW);
        },
        (error) => {
          console.log(error);
          this.state = globals.rootStates.HTTPERROR;
          this.errorMsg = error.status + " - " + error.statusText;
          this.errorState = error.status;
          this.errorInner = error.error;
        }
      );
    }
  }
  /**
   * the method creates the certificates from the given array
   */
  setCertificates(o: Object) {
    var array = [];
    for (var index in o) {
      array.push(new Certificate(o[index]));
    }
    this.certificates = array;
  }
  /**
   * the method sets the current users projects
   */
  setCurrentProjects(o: Object) {
    var array = [];
    for (var index in o) {
      array.push(new Project(o[index]));
    }
    this.projects = array;
  }
  /**
   * the method creates the datalocations from the given array
   */
  setDataLocations(o: Object) {
    var array = [];
    for (var index in o) {
      array.push(new DataLocation(o[index]));
    }
    this.dataLocations = array;
  }
  /**
   * the method sets the deployment information
   */
  setDeploymentInformation(o: Object) {
    var array = [];
    for (var index in o) {
      array.push(new DeploymentInformation(o[index]));
    }
    this.deploymentInformation = array;
  }
  /**
   * the method creates the use cases from the given array
   */
  setUseCases(o: Object) {
    var array = [];
    for (var index in o) {
      array.push(new UseCase(o[index]));
    }
    this.useCases = array;
  }
  /**
   * the method creates the service categories from the given array
   */
  setServiceCategories(o: Object) {
    var array = [];
    for (var index in o) {
      array.push(new ServiceCategory(o[index]));
    }
    this.serviceCategories = array;
  }
  /**
   * the method sets the service models
   */
  setServiceModels(o: Object) {
    var array = [];
    for (var index in o) {
      array.push(new ServiceModel(o[index]));
    }
    this.serviceModels = array;
  }
  /**
   * the method creates the providers from the given array
   */
  setProviders(o: Object) {
    var array = [];
    for (var index in o) {
      array.push(new Provider(o[index]));
    }
    this.providers = array;
  }
  /**
   * the method creates the storage types from the given array
   */
  setStorageTypes(o: Object) {
    var array = [];
    for (var index in o) {
      array.push(new StorageType(o[index]));
    }
    this.storageTypes = array;
  }
  /**
   * the method sets the applications state
   */
  setState(state: number) {
    this.state = state;
  }
  /**
   * the method sets the pop up message
   */
  showPopUpMessage(data: PopUpData){
    this.popUp = data;
  }
  /**
   * the method returns the current access token
   */
  get token() {
    return this._service.token;
  }
  /**
   * the method returns the current access token
   */
  set token(token: string) {
    this._service.token = token;
  }
  /**
   * the method opens the login dialog
   */
  openLoginDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new User()
    const dialogRef = this._dialog.open(LoginComponent, dialogConfig);
    dialogRef.componentInstance.submitData.subscribe((credentials: User) => {
      if (!credentials.isLoginValid()) return;
      this._service.loginUser(credentials).subscribe(
        result => {
          this.loginCallback(result);
          dialogRef.close();
        },

        error => {
          console.log(error);
          this.errorMsg = error.status + " - " + error.statusText;
          this.errorState = error.status;
          dialogRef.componentInstance.hasError = true;
          dialogRef.componentInstance.loginErrorMsg = error.error.error_description;
        }
      );
    });
  }
  /**
   * the method starts the register dialog
   */
  openRegisterDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new User();
    const dialogRef = this._dialog.open(RegisterComponent, dialogConfig);
    dialogRef.componentInstance.submitData.subscribe((credentials: User) => {
      if (!credentials.isRegistrationValid()) return;
      this._service.registerUser(credentials).subscribe(
        result => {
          this._service.loginUser(credentials).subscribe(
            result => {
              this.loginCallback(result);
              dialogRef.close();
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        }
      );
    });
  }
  /**
   * the method starts the register dialog
   */
  openUserDetailDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      username: this.username,
      rights: this.roleRights
    };
    const dialogRef = this._dialog.open(UserDetailComponent, dialogConfig);
    dialogRef.componentInstance.logoutEmitter.subscribe(() => {
      dialogRef.close();
      this.logout();
    });
  }
  /**
   * the method returns the current access token
   */
  get username() {
    return localStorage.getItem("username");
  }
  /**
   * the method returns the current access token
   */
  set username(token: string) {
    localStorage.setItem("username", token);
  }
}