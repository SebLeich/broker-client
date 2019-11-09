import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import * as globals from "../../globals";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: "app-startpage",
  templateUrl: "./startpage.component.html",
  styleUrls: ["./startpage.component.css"]
})
export class StartpageComponent implements OnInit {
  @Output() public stateEmitter = new EventEmitter();

  globals = globals;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  setState(state: number) {
    this.stateEmitter.emit(state);
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

    

    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .subscribe(data => console.log("Dialog output:", data));
  }
}
