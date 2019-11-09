import { Component, OnInit } from "@angular/core";
import * as globals from "../../globals";
import { Project } from "../../Project";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"]
})
export class RootComponent implements OnInit {
  state: number = globals.rootStates.STARTPAGE;
  loginState: number = globals.loginStates.CLOSED;
  project: Project;
  globals = globals;

  constructor(private dialog: MatDialog) {
    this.project = new Project();
    this.project.projectTitle = "This is a Test Title";
  }

  ngOnInit() {}

  setState(state: number) {
    this.state = state;
  }

  openDialog(dialogComponentName: number) {
    console.log(dialogComponentName);
    let dialogComponent;

    switch (dialogComponentName) {
      case globals.components.REGISTERCOMPONENT:
        dialogComponent = RegisterComponent;
        break;
      default:
        throw "unknown component error";
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: "Angular For Beginners"
    };

    const dialogRef = this.dialog.open(dialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe(data => console.log("Dialog output:", data));
  }
  /*
  setLoginState(state: number) {
    this.loginState = state;
  }
  */
}
