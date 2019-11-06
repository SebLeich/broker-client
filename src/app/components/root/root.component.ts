import { Component, OnInit } from "@angular/core";
import * as globals from "../../globals";
import { Project } from "../../Project";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"]
})
export class RootComponent implements OnInit {
  state: number = globals.rootStates.STARTPAGE;
  loginState: number = globals.loginStates.CLOSED;
  project: Project;

  constructor() {
    this.project = new Project();
    this.project.projectTitle = "This is a Test Title";
  }

  ngOnInit() {}

  setState(state: number) {
    this.state = state;
  }
  /*
  setLoginState(state: number) {
    this.loginState = state;
  }
  */
}
