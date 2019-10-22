import { Component, OnInit, Injectable, Input, Output, EventEmitter } from "@angular/core";
import { UseCaseService } from "../services/use-case-service"

@Component({
  selector: "use-case-list",
  templateUrl: "./use-case-list.component.html",
  styleUrls: ["./use-case-list.component.css"]
})

@Injectable()
export class UseCaseListComponent implements OnInit {

  title = "Verfügbare Entscheidungen im Status";
  useCases;

  @Input() state;
  @Input() stateHistory;
  @Input() ucHistory;

  @Output() editedEmitter = new EventEmitter<number>();

  constructor(
    private service: UseCaseService
  ) {

  }

  log(){
    console.log(this);
  }

  ngOnInit() {
    this.useCases = this.service.getUseCases();
  }

  setCase(c){
    this.stateHistory.push(this.state);
    this.ucHistory.push(c.id);
    this.state = c.target;
    this.editedEmitter.emit(this.state);
  }
}