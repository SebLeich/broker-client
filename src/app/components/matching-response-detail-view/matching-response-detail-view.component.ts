import { Component, OnInit, Input } from '@angular/core';
import { MatchingResponse } from 'src/app/classes/search';
import { Project } from 'src/app/classes/project';
import { 
  BlockStorageService, 
  DirectAttachedService, 
  KeyValueStorageService, 
  ObjectStorageService, 
  OnlineDriveStorageService, 
  RelationalDatabaseService
} from 'src/app/classes/service';


@Component({
  selector: 'app-matching-response-detail-view',
  templateUrl: './matching-response-detail-view.component.html',
  styleUrls: ['./matching-response-detail-view.component.css']
})
export class MatchingResponseDetailViewComponent implements OnInit {
  /**
   * the attribute contains the current matching response
   */
  @Input() currentMatchingResponse: MatchingResponse;
  /**
   * the attribute contains the current set of projects
   */
  @Input() projects: Project[];
  /**
   * the constructor creates a new instance of the component
   */
  constructor() {

  }
  /**
   * the method returns the components current project
   */
  get currentProject(): Project {
    return this.projects.find(x => x.id == this.currentMatchingResponse.projectId);
  }
  /**
   * the method returns the component's current service
   */
  get currentService(): any {
    return this.currentMatchingResponse.service;
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
    console.log(this.projects);
  }
  /**
   * the method returns the service type name
   */
  get serviceType(): string {
    switch (this.currentMatchingResponse.service.constructor) {
      case BlockStorageService: return "Block Storage Service";
      case DirectAttachedService: return "Direct Attached Service";
      case KeyValueStorageService: return "Key Value Storage Service";
      case ObjectStorageService: return "Object Storage Service";
      case OnlineDriveStorageService: return "Online Drive Storge Service";
      case RelationalDatabaseService: return "Relational Database Storage Service";
    }
    return null;
  }
}
