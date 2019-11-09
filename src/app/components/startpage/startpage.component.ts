import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as globals from "../../globals";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: "app-startpage",
  templateUrl: "./startpage.component.html",
  styleUrls: ["./startpage.component.css"]
})
export class StartpageComponent implements OnInit {
  @Output() public stateEmitter = new EventEmitter();
  @Output() public dialogEmitter = new EventEmitter();

  globals = globals;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  setState(state: number) {
    this.stateEmitter.emit(state);
  }
  openRegisterDialog() {
    this.dialogEmitter.emit(globals.components.RegisterComponent);
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.height = "500px";

    dialogConfig.data = {
      id: 1,
      title: "Angular For Beginners"
    };

    this.dialog.open(RegisterComponent, dialogConfig);

    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe(data => console.log("Dialog output:", data));
  }
}
