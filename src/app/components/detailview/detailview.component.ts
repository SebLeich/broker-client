import { Component, OnInit, Input } from '@angular/core';
import { Service } from "../../classes/service";
import { UseCaseService } from "../../services/use-case-service";
import * as globals from "../../globals";

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})
export class DetailviewComponent implements OnInit {

  private _ser: Service[] = [];
  private _currentInd = 0;
  public editMode : boolean = false;
  private _state : number = globals.detailViewStates.DEFAULT;

  /**
   * the input value sets the internal use case list
   */
  @Input() set services(services: Service[]) {
    this._ser = services;
  }

  constructor(private useCaseService: UseCaseService) { }

  /**
   * the method returns the current service
   */
  get currentService() : Service {
    return this._ser[this._currentInd];
  }
  /**
   * the method logs the given element to the console
   */
  log(object){
    console.log(object);
  }
  /**
   * the method increases the current service pointer
   */
  next(){
    if(this.serviceCount - 1 > this._currentInd){
      this._currentInd++;
    } else {
      this._currentInd = 0;
    }
  }
  /**
   * the method persists current changes
   */
  saveChanges(){
    this.state = globals.detailViewStates.CURRENTLYPERSISTING;
    this.useCaseService.persistService(this.currentService).subscribe((result) => {
      this.state = globals.detailViewStates.PERSISTREADY;
      console.log(result);
    });
  }
  /**
   * the method returns the current number of services
   */
  get serviceCount(){
    return this._ser.length;
  }
  /**
   * the method sets the component states
   */
  set state(state: number){
    switch(state){
      case globals.detailViewStates.CURRENTLYPERSISTING:
        this._state = state;
        break;
      case globals.detailViewStates.PERSISTREADY:
        this._state = globals.detailViewStates.DEFAULT;
        this.editMode = false;
        break;
    }
  }
  /**
   * the method returns the components state
   */
  get state(){
    return this._state;
  }
  /**
   * the method toggles the edit mode (edit enabled/ disabled)
   */
  toggleReadOnly(){
    if(this.editMode){
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {

  }

}
