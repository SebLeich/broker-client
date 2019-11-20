import { Component, OnInit, Inject } from '@angular/core';
import { User } from "../../classes/user";
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
   * the constructor creates a new instance of the login component
   */
  constructor(
    /**
     * the data injected by the root component
     */
    @Inject(MAT_DIALOG_DATA) public user: User,
    /**
     * the dialoge parent
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
   * the method logs the current user in
   */
  loginUser(){
    this.dialogRef.close(this.user);
  }
  /**
   * the method logs the current user out
   */
  logout(){

  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
    console.log(this.user);
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
