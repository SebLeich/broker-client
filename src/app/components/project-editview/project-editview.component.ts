import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Project } from 'src/app/classes/project';
import { MatchingResponse } from 'src/app/classes/search';

@Component({
  selector: 'app-project-editview',
  templateUrl: './project-editview.component.html',
  styleUrls: ['./project-editview.component.css']
})
export class ProjectEditviewComponent implements OnInit {

  @Input() currentProject: Project;

  @Output() projectEmitter = new EventEmitter();

  @Output() gotoDetailViewEmitter = new EventEmitter();

  @Output() deleteMatchingResponseEmitter = new EventEmitter();

  columns: string[] = ["category", "value"];

  constructor() { }

  deleteMatchingResponse(response: MatchingResponse){
    this.deleteMatchingResponseEmitter.emit(response);
  }

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

  get sortedMatchingResponses() : MatchingResponse[] {
    return this.currentProject.matchingResponse.sort((a, b) => {
      if(a.created == null) return 1;
      else if(b.created == null) return -1;
      var vA = new Date(a.created).valueOf();
      var vB = new Date(b.created).valueOf();
      if(vA > vB) return -1;
      else if(vA < vB) return 1;
      else return 0;
    });
  }

}
