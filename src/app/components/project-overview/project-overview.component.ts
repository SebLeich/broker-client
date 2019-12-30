import { Component, OnInit, Input } from '@angular/core';
import { Project } from "../../classes/project";

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {

  @Input() projects: Project[];

  constructor() { }
  
  ngOnInit() {
  }

}
