import { Component, OnInit } from "@angular/core";
import * as globals from "../../globals";
import { Project } from "../../classes/project";
import {
  Certificate,
  Service,
  ServiceCategory,
  ServiceProvider,
  DeploymentInformation,
  DataLocation,
  ServiceModel
} from "../../classes/service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { RegisterComponent } from "../register/register.component";
import { UseCase } from "../../classes/use-case";
import { BackEndService } from "../../services/backend-service";
import { LoginComponent } from "src/app/components/login/login.component";
import { RoleRight, User } from "src/app/classes/account";
import { UserDetailComponent } from "../user-detail/user-detail.component";
import { SearchVector, MatchingResponse } from "src/app/classes/search";

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
  serviceProviders: ServiceProvider[] = [];

  /**
   * the constructor creates a new instance of the component
   */
  constructor(private dialog: MatDialog, private service: BackEndService) { }
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
   * the method returns the current service that can be passed for visualization
   */
  get currentService(): Service {
    return this.services[0];
  }

  get currentProject(): Project {
    var p = this.projects.find(x => x.projectId == this.projectPointer);
    if (typeof (p) == "undefined") return null;
    return p;
  }

  showService(service: Service) {
    this.services = [service];
    this.setState(globals.rootStates.SERVICEPREVIEW);
  }

  editService(service: Service) {
    this.services = [service];
    this.setState(globals.rootStates.SERVICEDETAILVIEW);
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
    this.service.get("api/account/current-rights").subscribe(
      result => {
        this.roleRights = [];
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
  /**
   * the method logs the current user out
   */
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    this.roleRights = [];
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
    this.service.getUseCases().subscribe((o: Object) => this.setUseCases(o));
    this.service
      .get(Certificate.location)
      .subscribe((o: Object) => this.setCertificates(o));
    this.service
      .get(DataLocation.location)
      .subscribe((o: Object) => this.setDataLocations(o));
    this.service
      .get(DeploymentInformation.location)
      .subscribe((o: Object) => this.setDeploymentInformation(o));
    this.service
      .get(ServiceCategory.location)
      .subscribe((o: Object) => this.setServiceCategories(o));
    this.service
      .get(ServiceModel.location)
      .subscribe((o: Object) => this.setServiceModels(o));
    this.service
      .get(ServiceProvider.location)
      .subscribe((o: Object) => this.setServiceProviders(o));
    if (this.isLoggedIn) {
      this.service.get("api/account/current-rights").subscribe(
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
    for (var index in s.types) {
      var t = s.types[index];
      this.service.sendSearch(t, s,
        (result: MatchingResponse[]) => {
          var p = this.currentProject;
          if (p == null) {
            p = new Project();
            p.sessionState.isNew = true;
            this.projects.push(p);
            this.projectPointer = p.projectId;
          }
          p.sessionState.isChanged = true;
          p.matchingResponses.push.apply(p.matchingResponses, result);
          this.setState(globals.rootStates.SERVICEPREVIEW);
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
    /*
    
    this.service.sendSearch(s).subscribe(
      result => {
        setTimeout(() => {
          var o = [];
          if (Array.isArray(result)) {
            for (var index in result) o.push(new s.types[0](result[index]));
          } else {
            o.push(new s.types[0](result));
          }
          this.services = o;
          this.setState(globals.rootStates.SERVICEPREVIEW);
        }, 2000);
      },
      error => {
        console.log(error);
        this.state = globals.rootStates.HTTPERROR;
        this.errorMsg = error.status + " - " + error.statusText;
        this.errorState = error.status;
      }
    );
    */
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
   * the method creates the service categories from the given array
   */
  setServiceProviders(o: Object) {
    var array = [];
    for (var index in o) {
      array.push(new ServiceProvider(o[index]));
    }
    this.serviceProviders = array;
  }
  /**
   * the method sets the applications state
   */
  setState(state: number) {
    this.state = state;
  }
  /**
   * the method returns the current access token
   */
  get token() {
    return this.service.token;
  }
  /**
   * the method returns the current access token
   */
  set token(token: string) {
    this.service.token = token;
  }
  /**
   * the method opens the login dialog
   */

  openLoginDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new User()
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
    dialogRef.componentInstance.submitData.subscribe((credentials: User) => {
      if (!credentials.isLoginValid()) return;
      this.service.loginUser(credentials).subscribe(
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
    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
    dialogRef.componentInstance.submitData.subscribe((credentials: User) => {
      if (!credentials.isRegistrationValid()) return;
      this.service.registerUser(credentials).subscribe(
        result => {
          this.service.loginUser(credentials).subscribe(
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
    const dialogRef = this.dialog.open(UserDetailComponent, dialogConfig);
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
