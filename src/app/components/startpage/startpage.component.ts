import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as globals from "../../globals";

@Component({
  selector: "app-startpage",
  templateUrl: "./startpage.component.html",
  styleUrls: ["./startpage.component.css"]
})
export class StartpageComponent implements OnInit {
  @Output() public stateEmitter = new EventEmitter();

  globals = globals;

  constructor() {}

  ngOnInit() {}

  setState(state: number) {
    this.stateEmitter.emit(state);
  }
}
