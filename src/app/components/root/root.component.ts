import { Component, OnInit } from '@angular/core';
import * as globals from "../../globals";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"]
})
export class RootComponent implements OnInit {

  state: number = globals.rootStates.STARTPAGE;

  constructor() {}

  ngOnInit() {
    
  }

  setState(state: number){
    this.state = state;
  }
}
