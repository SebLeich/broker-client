import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { RoleRight } from 'src/app/classes/role-right';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  /**
   * the tables columns
   */
  cols: string[] = ["isAllowed", "rule", "role"];
  /**
   * the observable attribute emits on login click
   */
  @Output() logoutEmitter = new EventEmitter<any>();
  /**
   * the constructor creates a new instance of the login component
   */
  constructor(
    /**
     * the data injected by the root component
     */
    @Inject(MAT_DIALOG_DATA) public data,
    /**
     * the dialoge parent
     */
    private dialogRef: MatDialogRef<UserDetailComponent>
  ) {

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
  ngOnInit() {

  }
  /**
   * the method returns all user rights
   */
  get rights() : RoleRight[]{
    return this.data.rights;
  }
}
