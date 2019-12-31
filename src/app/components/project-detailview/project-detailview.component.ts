import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Project } from 'src/app/classes/project';

@Component({
  selector: 'app-project-detailview',
  templateUrl: './project-detailview.component.html',
  styleUrls: ['./project-detailview.component.css']
})
export class ProjectDetailviewComponent implements OnInit {

  @Input() currentProject: Project;

  @Output() projectEmitter = new EventEmitter();

  constructor() { }

  editProject(){
    this.projectEmitter.emit(this.currentProject);
  }

  ngOnInit() {
  }

}
