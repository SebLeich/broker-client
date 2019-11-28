import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { User } from "../../classes/account";
import * as globals from "../../globals";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material'

/**
 * the components definition
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * the class contains the login component
 */
export class LoginComponent implements OnInit {
  /**
   * the current views state
   */
  _state: number = globals.viewStates.DEFAULT;
  /**
   * the observable attribute emits on login click
   */
  @Output() submitData = new EventEmitter<any>();
  /**
   * the constructor creates a new instance of the login component
   */
  constructor(
    /**
     * the data injected by the root component
     */
    @Inject(MAT_DIALOG_DATA) public user: User,
    /**
     * the dialog parent
     */
    private dialogRef: MatDialogRef<LoginComponent>
  ) {

  }
  /**
   * the attribute returns whether the current user is already logged in
   */
  get isLoggedIn(){
    return false;
  }
  /**
   * the method emits the user credentials
   */
  loginUser(){
    this.submitData.emit(this.user);
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
    
  }
  /**
   * the method sets the component states
   */
  set state(state: number){
    switch(state){
      case globals.viewStates.WAITING:
        this._state = state;
        break;
      case globals.viewStates.READY:
        this._state = globals.viewStates.DEFAULT;
        break;
    }
  }
  /**
   * the method returns the components state
   */
  get state(){
    return this._state;
  }
}
