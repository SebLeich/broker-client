import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as globals from "../../globals";

@Component({
  selector: "app-project-description",
  templateUrl: "./project-description.component.html",
  styleUrls: ["./project-description.component.css"]
})
export class ProjectDescriptionComponent implements OnInit {
  @Output() public stateEmitter = new EventEmitter();
<<<<<<< HEAD
  @Output() public titleAndDescriptionEmitter = new EventEmitter();
=======
>>>>>>> a469643425e4a3959580141c9dfa84d42b4196e2

  globals = globals;

  public projectTitle = "";
  public projectDescription = "";

  constructor() {}

  ngOnInit() {}

  setState(state: number) {
    this.stateEmitter.emit(state);
  }
  setTitleAndDescription(title: string, description: string) {
    let array: Array<string> = [title, description];
    this.titleAndDescriptionEmitter.emit(array);
  }
}
