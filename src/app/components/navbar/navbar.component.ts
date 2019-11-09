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
   * the method starts the search for an use-case view
   */
  searchService(){
  
  }
  /**
   * the method sets the applications state
   */
  setState(state: number){
    this.stateEmitter.emit(state);
  }
}
