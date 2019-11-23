import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

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
   * the attribute stores whether the user is logged in or not
   */
  @Input() isLoggedIn;
  /**
   * the method emits the window state
   */
  @Output() public stateEmitter = new EventEmitter();
  /**
 * the method emits the register dialog event
 */
  @Output() public registerDialogEmitter = new EventEmitter();
  /**
   * the method emits the login dialog event
   */
  @Output() public loginDialogEmitter = new EventEmitter();
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
}
