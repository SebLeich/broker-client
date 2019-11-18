import { Component, EventEmitter, Input, AfterViewInit, ChangeDetectorRef, Output } from '@angular/core';
import { UseCase } from "../../classes/use-case";
import { UseCaseHistoryEntry } from "src/app/classes/use-case-history-entry"

@Component({
  selector: 'app-use-case-selection',
  templateUrl: './use-case-selection.component.html',
  styleUrls: ['./use-case-selection.component.css']
})

export class UseCaseSelectionComponent implements AfterViewInit {
  /**
   * a set of all available use cases from the configuration
   */
  private _uc: UseCase[] = [];
  /**
   * a set of passed states
   */
  stateHistory: number[] = [];
  /**
   * a set of selected use cases
   */
  useCaseHistory: UseCaseHistoryEntry[] = [];
  /**
   * the current states id
   */
  state: number = 0;
  /**
   * the input value sets the internal use case list
   */
  @Input() set useCases(useCases: UseCase[]) {
    this._uc = useCases;
  }
  /**
   * the emitter for the send search callback
   */
  @Output() searchEmitter = new EventEmitter();;
  /**
   * the construtor creates a new instance of the component
   */
  constructor(
    private ref: ChangeDetectorRef
  ) {

  }
  /**
   * the method returns all use cases available in the current state
   */
  get currentUseCases(){
    return this._uc.filter(x => x.data.source.includes(this.state));
  }
  /**
   * the method can be used to log values in the console
   */
  log(val){
    console.log(val);
  }
  /**
   * the method is called after the component is initialized
   */
  ngAfterViewInit() {

  }
  /**
   * the method sends the current search to the server
   */
  sendSearch(){
    this.searchEmitter.emit(this.useCaseHistory);
  }
  /**
   * the method sets the current states id
   */
  setUseCase(uCId: number){
    var u = this._uc.find(x => x.data.id == uCId);
    this.useCaseHistory.push(new UseCaseHistoryEntry(u));
    this.stateHistory.push(this.state);
    this.state = u.data.target;
    //this.ref.detectChanges();
  }
  /**
   * the method undos the last user input
   */
  undo() {
    if (this.stateHistory.length == 0) throw ("no states in history");
    var s = this.stateHistory[this.stateHistory.length - 1];
    this.stateHistory.splice(this.stateHistory.length - 1, 1);
    this.useCaseHistory.splice(this.useCaseHistory.length - 1, 1);
    this.state = s;
  }
}
