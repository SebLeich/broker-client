import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { StartPageTitle } from 'src/app/classes/metadata';
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
  public options: StartPageTitle[] = [
    new StartPageTitle({
      "cols": 2,
      "rows": 2,
      "bgColor": "#ffb00ade",
      "text": "Service suchen",
      "subtitle": "Suchen Sie nach Lösungen für Ihre Aufgaben",
      "headColor": "",
      "subColor": "",
      "click": function (input: StartpageComponent) {
        input.setState(globals.rootStates.USECASESELECTION);
      }
    }),
    new StartPageTitle({
      "cols": 2,
      "rows": 1,
      "bgColor": "#ff6c0ade",
      "text": "Neues Projekt anlegen",
      "subtitle": "Erstellen Sie ein neues Projekt",
      "headColor": "",
      "subColor": "",
      "click": function (input: StartpageComponent) {
        alert("NOT IMPLEMENTED NOW!");
      }
    }),
    new StartPageTitle({
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
    new StartPageTitle({
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
    new StartPageTitle({
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
    new StartPageTitle({
      "cols": 1,
      "rows": 1,
      "bgColor": "rgba(255, 26, 26, 0.74)",
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
    new StartPageTitle({
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
    new StartPageTitle({
      "cols": 2,
      "rows": 1,
      "bgColor": "#ff007abd",
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
