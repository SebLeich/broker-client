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

  constructor() { }

  /**
   * the method returns the current service
   */
  get currentService(){
    return this._ser[this._currentInd];
  }

  ngOnInit() {

  }

}
