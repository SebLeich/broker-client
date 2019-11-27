import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
/**
 * the class contains the navigation bar component
 */
export class NavbarComponent implements OnInit {
  /**
   * is the current user allowed to create services
   */
  @Input() canCreateServices;
    /**
   * is the current user allowed to create services
   */
  @Input() canRegisterRoles;
  /**
   * the attribute stores whether the user is logged in or not
   */
  @Input() isLoggedIn;
  /**
   * the attribute stores whether the user is logged in or not
   */
  @Input() username;
  /**
   * the method emits the login dialog invoke
   */
  @Output() loginDialogEmitter = new EventEmitter();
  /**
   * the method emits the user details dialog invoke
   */
  @Output() userDialogEmitter = new EventEmitter();
  /**
   * the method returns the window state
   */
  @Output() stateEmitter = new EventEmitter<number>();
  /**
   * the method triggers the logout event
   */
  @Output() logoutEmitter = new EventEmitter();
  /**
   * the constructor creates a new instance of a navigation bar
   */
  constructor(){

  }
  /**
   * the method logs the current user out
   */
  logout(){
    this.logoutEmitter.emit();
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit(){
    
  }
  /**
   * the method invokes the login dialog
   */
  openLoginDialog(){
    this.loginDialogEmitter.emit();
  }
  /**
   * the method invokes the user detail dialog
   */
  openUserDetailDialog(){
    this.userDialogEmitter.emit();
  }
  /**
   * the method sets the applications state
   */
  setState(state: number){
    this.stateEmitter.emit(state);
  }
}
