import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Profile } from "src/app/classes/profile";
import { MyErrorStateMatcher } from "src/app/classes/myErrorStateMatcher";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  description: string;

  matcher = new MyErrorStateMatcher();

  public username = "hugo";
  private password: string;
  private passwordRepeat: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.description = data.description;
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
        description: [this.description, []],
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

  close() {
    this.dialogRef.close();
  }
}
