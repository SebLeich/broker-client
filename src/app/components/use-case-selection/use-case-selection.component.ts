import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UseCase } from "../../classes/use-case";
import { UseCaseHistoryEntry } from "src/app/classes/use-case-history-entry";
import { SearchVector } from 'src/app/classes/search';
import { UseCaseSelecionStep, UseCaseSelectionOption } from 'src/app/classes/metadata';
import { MatStepper } from '@angular/material/stepper';
import { Service, ObjectStorageService, OnlineDriveStorageService, BlockStorageService, DirectAttachedService, IService, RelationalDatabaseService, KeyValueStorageService } from 'src/app/classes/service';

@Component({
  selector: 'app-use-case-selection',
  templateUrl: './use-case-selection.component.html',
  styleUrls: ['./use-case-selection.component.css']
})

export class UseCaseSelectionComponent implements OnInit {
  isLinear = true;
  /**
   * the step configuration
   */
  steps: UseCaseSelecionStep[] = [];
  /**
   * the current step pointer
   */
  currentInd = 0;
  /**
   * the method returns the current step
   */
  get currentStep() {
    return this.steps.find(x => x.id);
  }
  /**
   * a set of all available use cases from the configuration
   */
  private _uc: UseCase[] = [];
  /**
   * the search vector
   */
  private _searchVector = null;
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
  @Output() searchEmitter = new EventEmitter();

  @ViewChild("stepper", { static: true }) stepper: MatStepper;
  /**
   * the construtor creates a new instance of the component
   */
  constructor(
    private _formBuilder: FormBuilder
  ) {

  }
  /**
   * the method returns all use cases available in the current state
   */
  get currentUseCases() {
    return this._uc.filter(x => x.data.source.includes(this.state));
  }
  get isSearchable(): boolean {
    if(this._searchVector != null) return true;
    return false;
  }
  /**
   * the method initiates the page change of the stepper
   */
  next(){
    this.stepper.next();
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
    var uCOpts: UseCaseSelectionOption[] = [];
    var o: any = {};
    for(var index in this._uc){
      var uc = this._uc[index];
      uCOpts.push(new UseCaseSelectionOption({
        "id": uc.data.id,
        "text": uc.data.desc,
        "isActive": true,
        "uC": uc,
        "ngIf": function(page: UseCaseSelectionComponent): boolean {
          if(this.uC.data.source.includes(page.state)) return true;
          return false;
        }
      }));
      o[uc.data.id] = [false, Validators.required];
    }
    var uCFg: FormGroup = this._formBuilder.group(o);
    this.steps.push(
      new UseCaseSelecionStep({
        "id": 1,
        "headline": "Welche Art von Cloud Services suchen Sie?",
        "options": [
          new UseCaseSelectionOption({
            "id": 1, "text": "Cloud Storage", "isActive": true
          }),
          new UseCaseSelectionOption({
            "id": 2, "text": "Online Collaboration", "isActive": false
          })
        ],
        "fg": this._formBuilder.group({
          1: [null, Validators.requiredTrue],
          2: [false, Validators.required]
        })
      }),
      new UseCaseSelecionStep({
        "id": 2,
        "headline": "Welche Aussage trifft am meisten zu?",
        "options": uCOpts,
        "fg": uCFg
      }),
      new UseCaseSelecionStep({
        "id": 3,
        "headline": "Welche Anforderungen treffen am meisten zu?",
        "options": [
          new UseCaseSelectionOption({
            "id": 1, "text": "Suche nach Pseudo 1", "isActive": true
          }),
          new UseCaseSelectionOption({
            "id": 2, "text": "Suche nach Pseudo 2", "isActive": true
          })
        ],
        "fg": this._formBuilder.group({
          1: [null, Validators.nullValidator],
          2: [null, Validators.nullValidator]
        })
      })
    );
    uCFg.valueChanges.subscribe((result) => {
      var o: UseCase[] = [];
      for(var index in result){
        if(result[index]) o.push(this._uc.find(x => x.data.id == index));
      }
      var currentUC = o.find(x => x.data.source.includes(this.state));
      if(typeof(currentUC) == "undefined") throw("ERROR");
      this.state = currentUC.data.target;
      if(currentUC.data.mapping != null){
        this.setSearchMapping(currentUC.data.mapping);
      }
    });
  }
  /**
   * the method sends the current search to the server
   */
  sendSearch() {
    this.searchEmitter.emit(this._searchVector);
  }

  setSearchMapping(mapping: string){
    var input: IService;
    switch(mapping){
      case "object-storage":
        input = ObjectStorageService;
        break;
      case "odrive":
        input = OnlineDriveStorageService;
        break;
      case "block-storage":
        input = BlockStorageService;
        break;
      case "direct-att":
        input = DirectAttachedService;
        break;
      case "rdb":
        input = RelationalDatabaseService;
        break;
      case "nrdb":
        input = KeyValueStorageService;
        break;
    }
    if(typeof(input) == "undefined") throw("unknown mapping: " + mapping);
    this._searchVector = new SearchVector(input);
    this.stepper.next();
  }
  /**
   * the method sets the current states id
   */
  setUseCase(uCId: number) {
    var u = this._uc.find(x => x.data.id == uCId);
    this.useCaseHistory.push(new UseCaseHistoryEntry(u));
    this.stateHistory.push(this.state);
    this.state = u.data.target;
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
