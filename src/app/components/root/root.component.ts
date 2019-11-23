import { Component, OnInit } from "@angular/core";
import * as globals from "../../globals";
import { Project } from "../../classes/project";
import { Service, BlockStorageService, ServiceCategory } from "../../classes/service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { RegisterComponent } from "../register/register.component";
import { UseCase } from "../../classes/use-case";
import { BackEndService } from "../../services/backend-service";
import { LoginComponent } from "src/app/components/login/login.component";
import { UseCaseHistoryEntry } from 'src/app/classes/use-case-history-entry';
import { User } from 'src/app/classes/user';

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"]
})
/**
 * the class contains the main application component
 */
export class RootComponent implements OnInit {
  /**
   * the attribute contains the current application state
   */
  state: number = globals.rootStates.STARTPAGE;
  /**
   * obsolet?
   */
  loginState: number = globals.loginStates.CLOSED;
  /**
   * obsolet?
   */
  project: Project;
  useCases: UseCase[] = [];
  services: Service[] = [];
  serviceCategories: ServiceCategory[] = [];
  /**
   * the constructor creates a new instance of the component
   */
  constructor(
    private dialog: MatDialog,
    private service: BackEndService
  ) {

  }
  /**
   * the method checks whether the current user is logged in
   */
  get isLoggedIn() {
    var token = this.token;
    if (token == null || typeof (token) == "undefined") return false;
    return true;
  }
  /**
   * the method is called after the successful login
   */
  loginCallback(result) {
    this.token = result.access_token;
    this.username = result.userName;
  }
  /**
   * the method logs the current user out
   */
  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
    this.service.getUseCases().subscribe((o: Object) => this.setUseCases(o));
    this.service.get(ServiceCategory.location).subscribe((o: Object) => this.setServiceCategories(o));
  }
  /**
   * the method is called when the user sends his use case search
   */
  sendSearch(s: UseCaseHistoryEntry[]) {
    // s = ausgwählte Anwendungsfälle - bislang noch keine Suche möglich ... TODO
    this.service.sendSearch([]).subscribe((result) => {
      this.setState(globals.rootStates.SERVICEDETAILVIEW);
      var o = [];
      for (var index in result) o.push(new BlockStorageService(result[index]));
      this.services = o;
    });
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
    dialogConfig.data = new User();
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);
    dialogRef.componentInstance.submitData.subscribe(
      (credentials: User) => {
        if(!credentials.isLoginValid()) return;
        this.service.loginUser(credentials).subscribe(
          (result) => {
            this.loginCallback(result);
            dialogRef.close();
          },
          (error) => {
            console.log(error);
          }
        )
      }
    );
  }
  /**
   * the method starts the register dialog
   */
  openRegisterDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe((data) => {
        console.log("Dialog output:", data);
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
