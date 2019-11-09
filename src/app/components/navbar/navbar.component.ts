import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import * as globals from "../../globals";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  globals = globals;

  @Output() stateEmitter = new EventEmitter<number>();

  constructor(){

  }

  ngOnInit(){
    
  }
  /**
   * the method sets the applications state
   */
  setState(state: number){
    this.stateEmitter.emit(state);
  }
}
