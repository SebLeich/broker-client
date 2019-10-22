import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.css"]
})

export class RootComponent implements OnInit {
  state: number = rootStates.STARTPAGE;

<<<<<<< HEAD
  constructor() {}
=======
  state: number = rootStates.STARTPAGE;

  constructor() { }

  ngOnInit() {
    
  }
>>>>>>> 6254b6736f96962cdc2fc048db8554d3a3b51b9c

  ngOnInit() {}
}

var rootStates = {
  STARTPAGE: 0
<<<<<<< HEAD
};
=======
}
>>>>>>> 6254b6736f96962cdc2fc048db8554d3a3b51b9c
