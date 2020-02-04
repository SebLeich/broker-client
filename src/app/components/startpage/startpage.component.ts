import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { StartPageTile, MetaData } from 'src/app/classes/metadata';
import * as globals from "../../globals";
import { Project } from 'src/app/classes/project';
import { TranslateService } from '@ngx-translate/core';

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
   * the current server metadata
   */
  @Input() metaData: MetaData = null;
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
      },
      "class": ""
    }),
    new StartPageTile({
      "cols": 2,
      "rows": 1,
      "bgColor": "#ff6c0ade",
      "text": "Neues Projekt anlegen",
      "subtitle": "Erstellen Sie ein neues Projekt",
      "headColor": "",
      "subColor": "",
      "ngIf": (page: StartpageComponent) => {
        if(page.isLoggedIn) return true;
        return false;
      },
      "icon": "add",
      "click": function (input: StartpageComponent) {
        alert("NOT IMPLEMENTED NOW!");
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
      "cols": 2,
      "rows": 1,
      "bgColor": "#ba0630",
      "text": "Ihre Projekte",
      "subtitle": "Verwalten Sie Ihre Projekte",
      "headColor": "",
      "subColor": "",
      "icon": "layers",
      "ngIf": (page: StartpageComponent) => {
        if(page.isLoggedIn) return true;
        return false;
      },
      "click": function (input: StartpageComponent) {
        input.setState(globals.rootStates.PROJECTOVERVIEW);
      },
      "counter": function(input: StartpageComponent): number {
        return input.projectCounter;
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
      "icon": "person",
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
      "bgColor": "#2e3039bd",
      "text": "Service anlegen",
      "subtitle": "Legen Sie einen neuen Service an",
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
      "icon": "filter_drama",
      "ngIf": (page: StartpageComponent) => {
        if(page.canCreateServices) return true;
        return false;
      },
      "click": function (input: StartpageComponent) {
        input.setState(globals.rootStates.MANAGESERVICES);
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
      "icon": "tune",
      "ngIf": (page: StartpageComponent) => {
        if(page.canAdministrate) return true;
        return false;
      },
      "click": function (input: StartpageComponent) {
        input.setState(globals.rootStates.ADMINISTRATION);
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
  @Input() projectCounter;
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
   * the method emits a project
   */
  @Output() projectEmitter = new EventEmitter();
  /**
   * the constructor creates a new instance of the component
   */
  constructor(
    private translate: TranslateService
  ) {
    translate.setDefaultLang("de");
  }
  /**
   * the method creates a new project and navigates to the project edit view
   */
  createProject(){
    this.projectEmitter.emit(new Project());
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
