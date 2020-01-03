import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Project } from 'src/app/classes/project';

@Component({
  selector: 'app-project-editview',
  templateUrl: './project-editview.component.html',
  styleUrls: ['./project-editview.component.css']
})
export class ProjectEditviewComponent implements OnInit {

  @Input() currentProject: Project;

  @Output() projectEmitter = new EventEmitter();

  @Output() gotoDetailViewEmitter = new EventEmitter();

  columns: string[] = ["category", "value"];

  constructor() { }

  gotoProjectDetailView(){
    this.gotoDetailViewEmitter.emit(this.currentProject);
  }

  log(){
    console.log(this.currentProject);
  }

  ngOnInit() {
  }

  persistProject(){
    this.projectEmitter.emit(this.currentProject);
  }

}
