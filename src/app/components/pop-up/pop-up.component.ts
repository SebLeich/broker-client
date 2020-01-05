import { Component, Inject, OnInit } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  public message: string;
  public icon: string;
  public showSpinner: boolean;
  public iconClass: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: PopUpData
  ) {
    this.message = data.message;
    this.icon = data.icon;
    this.showSpinner = data.showSpinner;
    this.iconClass = data.iconClass;
  }

  hasIcon(): boolean {
    if(this.icon == null) return false;
    return true;
  }

  ngOnInit() {
  }

}
export class PopUpData {
  public message: string = "[NO MESSAGE]";
  public icon: string = null;
  public showSpinner: boolean = false;
  public iconClass: string = "";

  constructor(object?){
    if(object != null && typeof(object) != "undefined"){
      this.message = object.message;
      this.icon = object.icon;
      this.showSpinner = object.showSpinner;
      this.iconClass = object.iconClass;
    }
  }
}
