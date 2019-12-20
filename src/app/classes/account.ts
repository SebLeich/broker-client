import {
  FormGroup
} from "@angular/forms";

export class RoleRight {
  public isAllowed: boolean;
  public roles: Role[];
  public rule: Rule;
  public ruleId: number;

  constructor(object) {
    this.isAllowed = object.isAllowed;
    this.roles = object.roles;
    this.rule = new Rule(object.rule);
    this.ruleId = object.ruleId;
  }
}

export class Role {
  public roleName: string;

  constructor(object) {
    this.roleName = object.roleName;
  }
}

export class Rule {
  public id: number;
  public ruleCode: string;
  public ruleDesc: string;
  public ruleTitle: string;

  constructor(object) {
    this.id = object.id;
    this.ruleCode = object.ruleCode;
    this.ruleDesc = object.ruleDesc;
    this.ruleTitle = object.ruleTitle;
  }
}

/**
 * the class contains an application's user
 */
export class User {
  public id: string;
  public username: string;
  public password: string;
  public confirmPassword: string;
  public roles: string[] = [];
  /**
         * 1 uppercase letter
          1 lowercase letter
          A number
          A minimum length of 8.
         */
  public passWordrequirements =
    "^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$";
  public minPasswordlenght = 8;
  public minUsernamelenght = 4;
  /**
   * the constructor creates a new instance of an user
   */
  constructor(object?) {
    if (object != null && typeof object != "undefined") {
      this.id = object.id;
      this.username = object.userName;
      this.password = object.password;
      this.confirmPassword = object.confirmPassword;
      for (var index in object.roles)
        this.roles.push(object.roles[index].roleName);
    }
  }
  /**
   * the method checks whether the user model is valid for registration
   */
  isLoginValid() {
    if (this.username.length < this.minUsernamelenght) return false;
    if (this.password.length < this.minPasswordlenght) return false;
    return true;
  }
  /**
   * the method checks whether the user model is valid for registration
   */
  isRegistrationValid() {
    if (this.username.length < this.minUsernamelenght) return false;
    if (this.password.length < this.minPasswordlenght) return false;
    if (this.password != this.confirmPassword) return false;
    return true;
  }

  equalPasswords(myForm: FormGroup): boolean {
    const password1 = myForm.get("password1").value;
    const password2 = myForm.get("password2").value;

    const matched: boolean = password1 === password2;

    if (matched) {
      myForm.controls.password2.setErrors(null);
    } else {
      myForm.controls.password2.setErrors({
        notMatched: true
      });
    }

    return matched;
  }
}