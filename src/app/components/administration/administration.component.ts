import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as globals from "../../globals";
import { Component, Input, OnInit } from '@angular/core';
import { BackEndService } from "../../services/backend-service";
import { Role, RoleRight, User } from 'src/app/classes/account';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  constructor(private service: BackEndService) {

  }

  public users: User[] = [];

  public roles: Role[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  /**
   * the rule table columns
   */
  ruleCols: string[] = ["isAllowed", "rule"];
  /**
   * the user-role table columns
   */
  uRCols: string[] = ["icon", "user", "roles"];

  public selectRolePlaceholder: string = "Rolle wählen";

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private _RoleRightPointer: string = null;

  private _RoleRightStore: RoleRight[] = [];

  public userState: number = globals.viewStates.WAITING;
  public roleState: number = globals.viewStates.WAITING;
  public roleRightState: number = globals.viewStates.WAITING;

  @Input() canRegisterRoles;

  @Input() canEditSecurityGuidelines;

  @Input() currentUser : string;

  addRole(event: MatChipInputEvent) {
    let r = new Role({ roleName: event.value });
    this.service.post("api/account/role", r).subscribe(
      (success) => {
        this.roles.push(r);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  set currentRole(role: Role) {
    this.roleRightState = globals.viewStates.WAITING;
    this._RoleRightPointer = role.roleName;
    this.service.get("api/account/role-right/" + role.roleName).subscribe(
      (result) => {
        let o: RoleRight[] = [];
        for (var index in result) {
          o.push(new RoleRight(result[index]));
        }
        this._RoleRightStore = o;
        this.roleRightState = globals.viewStates.READY;
      }
    );
  }

  get currentRole(): Role {
    if (this._RoleRightPointer == null) return null;
    return this.roles.find(x => x.roleName == this._RoleRightPointer);
  }

  get currentRights(): RoleRight[] {
    if (this.roleRightState == globals.viewStates.WAITING) return null;
    return this._RoleRightStore;
  }

  ngOnInit() {
    this.service.get("api/account/role").subscribe((result) => {
      var o: Role[] = [];
      for (var index in result) {
        var r = new Role(result[index]);
        o.push(r);
        if (index == "0") this.currentRole = r;
      }
      this.roles = o;
      this.roleState = globals.viewStates.READY;
    });
    this.service.get("api/account").subscribe((result) => {
      var o: User[] = [];
      for (var index in result) {
        var u = new User(result[index]);
        o.push(u);
      }
      this.users = o;
      this.userState = globals.viewStates.READY;
    });
  }

  persistRoleRight(right: RoleRight) {
    if (right.isAllowed) {
      right.isAllowed = false;
    } else {
      right.isAllowed = true;
      right.roles.push(this.currentRole);
    }
    console.log(right);
    this.service.post("api/account/role-right", right).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeRole(role: Role) {
    let i = this.roles.indexOf(role);
    if (i > -1) {
      this.service.delete("api/account/role/" + role.roleName).subscribe(
        (success) => {
          this.roles.splice(i, 1);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  selectRole(event: MatSelectChange){
    let r = this.roles.find(x => x.roleName == event.value);
    if(typeof(r) == "undefined") throw("error: role not found");
    this.currentRole = r;
  }

  selectRoleForUser(user: User, event: MatSelectChange){
    var diff : string[] = [];
    var url = "api/account/role-connection/";
    if(user.roles.length < event.value.length){
      // added role
      diff = event.value.filter(x => !user.roles.includes(x));
      url += "add";
    } else {
      // removed role
      diff = user.roles.filter(x => !event.value.includes(x));
      url += "remove";
    }
    this.service.post(url, {
      "userName": user.username,
      "roles": diff
    }).subscribe((result) => {
      user.roles = event.value;
      console.log(result);
    });
  }
}
