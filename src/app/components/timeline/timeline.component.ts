import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements AfterViewInit {

  _history: number[] = [];

  @Input() useCases;
  @Input() set useCaseHistory(h){
    this._history = h;
    this.fill();
  };

  constructor() { }

  fill(){
    console.log(this._history);
  }

  ngAfterViewInit(){
    console.log(this.useCases, this.useCaseHistory);
  }

}
