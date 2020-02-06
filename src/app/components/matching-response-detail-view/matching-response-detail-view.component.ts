import { Component, ElementRef, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
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
import { BackEndService } from 'src/app/services/backend-service';
import { Image } from '../../classes/image';
import { Chart } from 'chart.js';


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
   * is the current user logged in
   */
  @Input() isLoggedIn: boolean;
  /**
   * is the current user allowed to edit services
   */
  @Input() canEditServices: boolean;
  /**
   * the navigation object emitter
   */
  @Output() projectEmitter = new EventEmitter();

  @ViewChild("metadata", {static: true}) meta: ElementRef;

  @ViewChild("banner", {static: true}) banner: ElementRef;

  @ViewChild("uploadBanner", {static: true}) uploadBanner: ElementRef;

  @ViewChild("uploadLogo", {static: true}) uploadLogo: ElementRef;
  /**
   * the constructor creates a new instance of the component
   */
  constructor(
    private backendService: BackEndService
  ) {

  }

  get metaTop(): number {
    return 20 + this.meta.nativeElement.offsetTop + (1.5 * this.meta.nativeElement.offsetHeight);
  }
  /**
   * the method returns the data uri of the current service's banner
   */
  get bannerData(): string {
    if(this.currentService.banner == null) return null;
    return "data:" + this.currentService.banner.mediaType + ";base64," + this.currentService.banner.imageData;
  }
  /**
   * the method triggers the banner upload
   */
  triggerUploadBanner(){
    if(!this.canUpload) return;
    this.uploadBanner.nativeElement.click()
  }
  /**
   * the method triggers the logo upload
   */
  triggerUploadLogo(){
    if(!this.canUpload) return;
    this.uploadLogo.nativeElement.click();
  }
  /**
   * this method returns whether the current user is allowed to edit services
   */
  get canUpload(): boolean {
    if(this.isLoggedIn && this.canEditServices) return true;
    return false;
  }
  /**
   * the method returns the data uri of the current service's logo
   */
  get logoData(): string {
    if(this.currentService.logo == null) return null;
    return "data:" + this.currentService.logo.mediaType + ";base64," + this.currentService.logo.imageData;
  }
  /**
   * the method returns the current services matching percentage
   */
  get currentPercentage(): number {
    return Math.round((this.currentMatchingResponse.points / this.currentProject.total)*100);
  }
  /**
   * the method renders a dough nut chart to the matching response tile
   */
  renderDough(){
    var parent = document.getElementById("dough-chart-parent");
    if (parent == null) return;
    parent.innerHTML = "";
    var element = document.createElement("canvas");
    parent.appendChild(element);
    var percentage = this.currentPercentage;
    var ctx = element.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [{
          data: [percentage, (100 - percentage)],
          backgroundColor: ["rgba(102, 174, 19, 0.55)", "#dfdfdf"],
          borderColor: ["rgb(255,255,255)", "rgb(255,255,255)"],
          borderWidth: 5
        }],
        labels: [
          "Übereinstimmung",
          "Fehlend"
        ]
      },
      options: {
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
          }
        },
        maintainAspectRatio: false,
        responsive: true
      }
    });
    (<HTMLDivElement>document.getElementById("chart-parent-counter")).innerHTML = percentage.toString() + "%";
  }
  /**
   * the method selects a service banner
   */
  chooseBanner(files){
    if (files && files.length > 0) {
      let file = files[0];
      let formData = new FormData();
      formData.append('file', file);
      this.backendService.post(Image.location + "/upload", formData).subscribe(
        (result) => {
          var i = new Image(result);
          this.currentService.banner = i;
          this.backendService.persistService(this.currentService).subscribe((result) => {
            console.log(result);
          });
        }
      );
     }
  }
  /**
   * the method selects a service logo
   */
  chooseLogo(files){
    if (files && files.length > 0) {
      let file = files[0];
      let formData = new FormData();
      formData.append('file', file);
      this.backendService.post(Image.location + "/upload", formData).subscribe(
        (result) => {
          var i = new Image(result);
          this.currentService.logo = i;
          this.backendService.persistService(this.currentService).subscribe((result) => {
            console.log(result);
          });
        }
      );
     }
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
   * the method navigates to the matching results overview
   */
  back(){
    this.projectEmitter.emit(this.currentProject);
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
    this.renderDough();
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
