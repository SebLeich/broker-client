import { Component, OnInit } from "@angular/core";
import * as globals from "../../globals";
import { Project } from "../../Project";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { RegisterComponent } from "../register/register.component";
import { UseCase } from "../../classes/use-case";
import { UseCaseService } from "../../services/use-case-service";
import { UseCaseComponent } from "../../use-case/use-case.component";
import { LoginComponent } from "src/app/components/login/login.component";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"]
})
export class RootComponent implements OnInit {
  globals = globals;
  state: number = globals.rootStates.STARTPAGE;
  loginState: number = globals.loginStates.CLOSED;
  project: Project;
  useCases: UseCase[] = [];

  constructor(
    private dialog: MatDialog,
    private useCaseService: UseCaseService
  ) {
    this.project = new Project();
    this.project.projectTitle = "This is a Test Title";
  }

  ngOnInit() {
    this.useCaseService.getUseCases().subscribe((o: Object) => this.setUseCases(o));
  }
  /**
   * the method creates the use cases from the given array
   */
  setUseCases(o: Object){
    var array = [];
    for(var index in o){
      array.push(new UseCase(UseCaseComponent, o[index]));
    }
    this.useCases = array;
    console.log(this.useCases.length);
  }

  setState(state: number) {
    this.state = state;
  }

  openDialog(dialogComponentName: number) {

    let dialogComponent;

    switch (dialogComponentName) {
      case globals.components.REGISTERCOMPONENT:
        dialogComponent = RegisterComponent;
        break;
      case globals.components.LOGINCOMPONENT:
        dialogComponent = LoginComponent;
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
