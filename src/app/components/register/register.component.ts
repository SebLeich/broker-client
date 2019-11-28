import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as globals from "../../globals";
import { User } from "../../classes/account";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  /**
   * the current views state
   */
  _state: number = globals.viewStates.DEFAULT;
  /**
   * the observable attribute emits on login click
   */
  @Output() submitData = new EventEmitter<any>();

  constructor(
    /**
     * the data injected by the root component
     */
    @Inject(MAT_DIALOG_DATA) public user: User,
    /**
     * the dialog parent
     */
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {

  }
  /**
   * the method emits the user credentials
   */
  registerUser() {
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
  set state(state: number) {
    switch (state) {
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
  get state() {
    return this._state;
  }
}
