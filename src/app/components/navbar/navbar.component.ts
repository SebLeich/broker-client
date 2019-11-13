import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import * as globals from "../../globals";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() public dialogEmitter = new EventEmitter();
  globals = globals;

  @Output() stateEmitter = new EventEmitter<number>();

  constructor(){

  }

  ngOnInit(){
    
  }
  openLoginDialog(){
    this.dialogEmitter.emit(globals.components.LOGINCOMPONENT);
  }
  /**
   * the method sets the applications state
   */
  setState(state: number){
    this.stateEmitter.emit(state);
  }
}
