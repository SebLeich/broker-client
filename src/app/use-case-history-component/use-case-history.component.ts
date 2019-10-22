import { Component, OnInit, Output, Injectable, Input, EventEmitter } from "@angular/core";
import { UseCaseService } from "../services/use-case-service";

@Component({
  selector: "use-case-history",
  templateUrl: "./use-case-history.component.html",
  styleUrls: ["./use-case-history.component.css"]
})

@Injectable()
export class UseCaseHistoryComponent implements OnInit {

  useCases;
  @Input() state: number;
  @Input() stateHistory: number[];
  @Input() ucHistory: number[];

  @Output() editedEmitter = new EventEmitter<number>();

  constructor(
    private service: UseCaseService
  ) {

  }

  ngOnInit() {
    this.useCases = this.service.getUseCases();
    console.log(this);
  }

  setCase(c){
    var sH : number[];
    var uH : number[];
    var i = this.ucHistory.indexOf(c.id);
    if(i > -1){
      var lastState = 0;
      for(var index = 0; index <= i; index++){
        if(index == i){
          lastState = this.stateHistory[index];
        } else {
          sH.push(this.stateHistory[index]);
          uH.push(this.ucHistory[index]);
        }
      }
      this.ucHistory = uH;
      this.stateHistory = sH;
      this.state = lastState;
    }
    console.log(i, this);
  }
}