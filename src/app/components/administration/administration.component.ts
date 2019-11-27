import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { BackEndService } from "../../services/backend-service";
import { Role } from 'src/app/classes/role-right';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  constructor(private service: BackEndService) {

  }

  public roles: Role[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() canRegisterRoles;

  addRole(event: MatChipInputEvent){
    console.log(event);
    let r = new Role({ roleName: event.value });
    this.service.post("api/account/role", r).subscribe(
      (success) => {
        console.log(success);
        this.roles.push(r);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.service.get("api/account/role").subscribe((result) => {
      var o: Role[] = [];
      for(var index in result){
        o.push(new Role(result[index]));
      }
      this.roles = o;
    });
  }

  removeRole(role: Role){
    console.log(role);
    let i = this.roles.indexOf(role);
    if(i > -1){
      this.roles.splice(i, 1);
      this.service.delete("api/account/role/" + role.roleName).subscribe(
        (success) => {
          console.log(success);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
