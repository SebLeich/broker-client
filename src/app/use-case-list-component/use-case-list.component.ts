import { Component, OnInit, Injectable, Input } from "@angular/core";
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

  constructor(
    private service: UseCaseService
  ) {

  }

  ngOnInit() {
    this.useCases = this.service.getUseCases();
  }

  setCase(c){
    console.log(c, this.stateHistory, this.ucHistory);
    this.stateHistory.push(this.state);
    this.ucHistory.push(c.id);
    this.state = c.target;
    console.log(this.stateHistory, this.ucHistory);
  }
}