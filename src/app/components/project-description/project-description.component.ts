import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as globals from "../../globals";

@Component({
  selector: "app-project-description",
  templateUrl: "./project-description.component.html",
  styleUrls: ["./project-description.component.css"]
})
export class ProjectDescriptionComponent implements OnInit {
  @Output() public stateEmitter = new EventEmitter();

  globals = globals;

  public projectTitle = "";
  public projectDescription = "";

  constructor() {}

  ngOnInit() {}

  setState(state: number) {
    this.stateEmitter.emit(state);
  }
}
