import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"]
})
export class RootComponent implements OnInit {
  state: number = rootStates.STARTPAGE;

  constructor() {}

  ngOnInit() {}
}

var rootStates = {
  STARTPAGE: 0
};
