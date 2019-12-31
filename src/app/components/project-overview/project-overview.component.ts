import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Project } from "../../classes/project";

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {

  @Input() projects: Project[];

  @Output() projectEmitter = new EventEmitter();

  constructor() { }
  
  createProject(){
    console.log("NEW PROJEKT");
  }

  gotoProjectDetailView(project){
    this.projectEmitter.emit(project);
  }

  ngOnInit() {
  }

}
