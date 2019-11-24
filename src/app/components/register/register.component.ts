import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../../classes/user";
import { MyErrorStateMatcher } from "src/app/classes/myErrorStateMatcher";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();

  /**
   * the method emits the registration data
   */
  @Output() public registrationDataEmitter = new EventEmitter();

  public user : User;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get("password").value;
    let confirmPass = group.get("confirmPassword").value;

    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        password: ["", [Validators.required]],
        confirmPassword: [""],
        username: ["", [Validators.required, Validators.minLength(6)]]
      },
      { validator: this.checkPasswords }
    );
  }

  

  save() {
    this.dialogRef.close(this.form.value);
  }
    /**
   * the method closes the Dialog an submits the registration data
   */
  closeAndSubmit() {
    this.dialogRef.close();
    this.registrationDataEmitter.emit([this.user]);
  }
}
