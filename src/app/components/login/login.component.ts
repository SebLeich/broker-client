import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  userPassword: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
  ) { }

  ngOnInit() {
    this.form = this.fb.group(
      {
        password: ["", [Validators.required]],
        username: ["", [Validators.required]]
      },
      { validator: this.checkPasswords }
    );
  }



//to check the password in the front end
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get("password").value;
    let userPass = this.userPassword;

    return pass === userPass ? null : { notSame: true };
  }

}
