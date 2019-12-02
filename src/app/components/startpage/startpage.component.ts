import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { StartPageTile } from 'src/app/classes/metadata';
import * as globals from "../../globals";

@Component({
  selector: "app-startpage",
  templateUrl: "./startpage.component.html",
  styleUrls: ["./startpage.component.css"]
})
/**
 * the class contains the startpage
 */
export class StartpageComponent implements OnInit {
  /**
   * the option tiles on the startpage
   */
  public options: StartPageTile[] = [
    new StartPageTile({
      "cols": 2,
      "rows": 2,
      "bgColor": "#ffb00ade",
      "text": "Service suchen",
      "subtitle": "Suchen Sie nach Lösungen für Ihre Aufgaben",
      "headColor": "",
      "subColor": "",
      "icon": "search",
      "click": function (input: StartpageComponent) {
        input.setState(globals.rootStates.USECASESELECTION);
      }
    }),
    new StartPageTile({
      "cols": 2,
      "rows": 2,
      "bgColor": "#ff6c0ade",
      "text": "Neues Projekt anlegen",
      "subtitle": "Erstellen Sie ein neues Projekt",
      "headColor": "",
      "subColor": "",
      "icon": "add",
      "click": function (input: StartpageComponent) {
        alert("NOT IMPLEMENTED NOW!");
      }
    }),
    new StartPageTile({
      "cols": 1,
      "rows": 1,
      "bgColor": "#66ae138c",
      "text": "Anmelden",
      "subtitle": "Mit Zugangsdaten anmelden",
      "headColor": "",
      "subColor": "",
      "ngIf": (page: StartpageComponent) => {
        if(page.isLoggedIn) return false;
        return true;
      },
      "click": function (input: StartpageComponent) {
        input.openLoginDialog();
      }
    }),
    new StartPageTile({
      "cols": 1,
      "rows": 1,
      "bgColor": "#66ae138c",
      "text": "Ihr Profil",
      "subtitle": "Benutzerprofil einsehen",
      "headColor": "",
      "subColor": "",
      "ngIf": (page: StartpageComponent) => {
        if(page.isLoggedIn) return true;
        return false;
      },
      "click": function (input: StartpageComponent) {
        input.openUserDialog();
      }
    }),
    new StartPageTile({
      "cols": 1,
      "rows": 1,
      "bgColor": "#ee1b1bd6",
      "text": "Abmelden",
      "subtitle": "Benutzer abmelden",
      "headColor": "",
      "subColor": "",
      "ngIf": (page: StartpageComponent) => {
        if(page.isLoggedIn) return true;
        return false;
      },
      "click": function (input: StartpageComponent) {
        input.logout();
      }
    }),
    new StartPageTile({
      "cols": 1,
      "rows": 1,
      "bgColor": "rgba(3, 17, 45, 0.67)",
      "text": "Registrieren",
      "subtitle": "Erstellen Sie einen Account",
      "headColor": "",
      "subColor": "",
      "click": function (input: StartpageComponent) {
        input.openRegisterDialog();
      }
    }),
    new StartPageTile({
      "cols": 1,
      "rows": 1,
      "bgColor": "#ffffff61",
      "text": "Administration",
      "subtitle": "Verwalten Sie den Cloud Broker",
      "headColor": "",
      "subColor": "",
      "ngIf": (page: StartpageComponent) => {
        if(page.canAdministrate) return true;
        return false;
      },
      "click": function (input: StartpageComponent) {
        input.setState(globals.rootStates.ADMINISTRATION);
      }
    }),
    new StartPageTile({
      "cols": 1,
      "rows": 1,
      "bgColor": "#2e3039bd",
      "text": "Service anlegen",
      "subtitle": "Legen Sie einen neuen Servive an",
      "headColor": "",
      "subColor": "",
      "ngIf": (page: StartpageComponent) => {
        if(page.canCreateServices) return true;
        return false;
      },
      "click": function (input: StartpageComponent) {
        input.setState(globals.rootStates.ADDSERVICE);
      }
    }),
    new StartPageTile({
      "cols": 2,
      "rows": 1,
      "bgColor": "#196a34bd",
      "text": "Services verwalten",
      "subtitle": "Verwalten Sie angelegte Services",
      "headColor": "",
      "subColor": "",
      "ngIf": (page: StartpageComponent) => {
        if(page.canCreateServices) return true;
        return false;
      },
      "click": function (input: StartpageComponent) {
        input.setState(globals.rootStates.MANAGESERVICES);
      }
    })
  ];
  /**
   * the attribute stores whether the user is logged in or not
   */
  @Input() isLoggedIn;
  /**
   * is the current user allowed to create services
   */
  @Input() canAdministrate;
  /**
   * is the current user allowed to create services
   */
  @Input() canCreateServices;
  /**
   * the method emits the window state
   */
  @Output() stateEmitter = new EventEmitter();
  /**
   * the method emits the logout event
   */
  @Output() logoutEmitter = new EventEmitter();
  /**
 * the method emits the register dialog event
 */
  @Output() registerDialogEmitter = new EventEmitter();
  /**
   * the method emits the login dialog event
   */
  @Output() loginDialogEmitter = new EventEmitter();
  /**
   * the method emits the user details dialog invoke
   */
  @Output() userDialogEmitter = new EventEmitter();
  /**
   * the constructor creates a new instance of the component
   */
  constructor() {

  }
  /**
   * the method initiates the logout event
   */
  logout(){
    this.logoutEmitter.emit();
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {

  }
  /**
   * the method emits the window state
   */
  setState(state: number) {
    this.stateEmitter.emit(state);
  }
  /**
   * the method initiates the login dialog
   */
  openLoginDialog() {
    this.loginDialogEmitter.emit();
  }
  /**
   * the method initiates the login dialog
   */
  openRegisterDialog() {
    this.registerDialogEmitter.emit();
  }
  /**
   * the method initiates the user details dialog
   */
  openUserDialog() {
    this.userDialogEmitter.emit();
  }
}
