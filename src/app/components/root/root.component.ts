import { Component, OnInit } from "@angular/core";
import * as globals from "../../globals";
import { Project } from "../../classes/project";
import { Service } from "../../classes/service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { RegisterComponent } from "../register/register.component";
import { UseCase } from "../../classes/use-case";
import { UseCaseService } from "../../services/use-case-service";
import { LoginComponent } from "src/app/components/login/login.component";
import { UseCaseHistoryEntry } from 'src/app/classes/use-case-history-entry';

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"]
})
export class RootComponent implements OnInit {
  state: number = globals.rootStates.STARTPAGE;
  loginState: number = globals.loginStates.CLOSED;
  project: Project;
  useCases: UseCase[];
  services: Service[];

  constructor(
    private dialog: MatDialog,
    private useCaseService: UseCaseService
  ) {

  }

  ngOnInit() {
    this.useCaseService.getUseCases().subscribe((o: Object) => this.setUseCases(o));
  }
  /**
   * the method is called when the user sends his use case search
   */
  sendSearch(s: UseCaseHistoryEntry[]){
    // s = ausgwählte Anwendungsfälle - bislang noch keine Suche möglich ... TODO
    this.useCaseService.sendSearch([]).subscribe((result) => {
      this.setState(globals.rootStates.SERVICEDETAILVIEW);
      for(var index in result){
        this.services.push(new Service(result[index]));
      }
    });
  }
  /**
   * the method creates the use cases from the given array
   */
  setUseCases(o: Object){
    var array = [];
    for(var index in o){
      array.push(new UseCase(o[index]));
    }
    this.useCases = array;
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
