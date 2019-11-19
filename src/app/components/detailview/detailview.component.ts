import { Component, OnInit, Input } from '@angular/core';
import { Service } from "../../classes/service";

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})
export class DetailviewComponent implements OnInit {

  private _ser: Service[] = [];
  private _currentInd = 0;

  /**
   * the input value sets the internal use case list
   */
  @Input() set services(services: Service[]) {
    this._ser = services;
  }

  constructor() {

  }

  /**
   * the method returns the current service
   */
  get currentService() : Service {
    return this._ser[this._currentInd];
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
   * the method returns the current number of services
   */
  get serviceCount(){
    return this._ser.length;
  }

  ngOnInit() {

  }

}
