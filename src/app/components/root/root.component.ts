import { Component, OnInit } from "@angular/core";
import * as myGlobals from "../../globals";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"]
})
export class RootComponent implements OnInit {
  state: number = myGlobals.rootStates.STARTPAGE;

  constructor() {}

  ngOnInit() {}
}
