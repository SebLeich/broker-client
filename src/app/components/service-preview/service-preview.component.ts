import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, OnInit } from '@angular/core';
import { Chart, ChartDataSets } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BlockStorageService, DirectAttachedService, KeyValueStorageService, ObjectStorageService, OnlineDriveStorageService, RelationalDatabaseService, IService, DataLocation } from 'src/app/classes/service';
import { Project } from 'src/app/classes/project';
import { MatchingResponse } from 'src/app/classes/search';

@Component({
  selector: 'app-service-preview',
  templateUrl: './service-preview.component.html',
  styleUrls: ['./service-preview.component.css']
})

export class ServicePreviewComponent implements OnInit {

  gap: number = 0;
  isInit: boolean = false;

  @Input() project: Project;

  @Output() gotoUseCaseEmitter = new EventEmitter();

  @Output() projectEmitter = new EventEmitter();

  _sP: number = null;

  set servicePointer(value: number) {
    this._sP = value;
    this.renderDough();
    this.renderNet();
  }

  get servicePointer(): number {
    return this._sP;
  }

  collapseSidebar: boolean = true;

  get matchingResponses(): MatchingResponse[] {
    if (this.project != null) {
      return this.project.matchingResponse;
    }
    return [];
  }

  get matchingResponse(): MatchingResponse {
    if (this.project != null && this.project.matchingResponse.length > 0) {
      if (this.servicePointer == null) {
        var s = this.project.matchingResponse[0];
        this.servicePointer = s.service.id;
        return s;
      }
      for (var index in this.project.matchingResponse) {
        if (this.project.matchingResponse[index].service.id == this.servicePointer) return this.project.matchingResponse[index];
      }
    }
    return null;
  }

  get services(): IService[] {
    var output = [];
    if (this.project != null && this.project.matchingResponse.length > 0) {
      for (var index in this.project.matchingResponse) {
        output.push(this.project.matchingResponse[index].service);
      }
    }
    return output;
  }

  get service(): any {
    if (this.project != null && this.project.matchingResponse.length > 0) {
      if (this.servicePointer == null) {
        var s = this.project.matchingResponse[0].service;
        this.servicePointer = s.id;
        return s;
      }
      for (var index in this.project.matchingResponse) {
        if (this.project.matchingResponse[index].service.id == this.servicePointer) return this.project.matchingResponse[index].service;
      }
    }
    return null;
  }

  get dataLocations() : DataLocation[] {
    var s:any = this.service;
    if(s == null) return [];
    return s.serviceDataLocations.map(x => x.dataLocation);
  }

  @Output() editEmitter = new EventEmitter();

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {
    setTimeout(() => this.isInit = true, 10);
  }

  classForPercentage(percentage: number): string {
    if (typeof (percentage) != "number") return "percentage-error";
    if (percentage < 30) {
      return "percentage-danger";
    } else if (percentage < 60) {
      return "percentage-warning";
    } else if (percentage < 80) {
      return "percentage-ok";
    } else {
      return "percentage-success";
    }
  }

  editService() {
    this.editEmitter.emit(this.service);
  }

  ngOnInit() {
    setTimeout(() => this.servicePointer = this.project.matchingResponse[0].service.id, 100);
  }

  onResize() {
    this.isInit = true;
  }

  get rowHeight(): number {
    var element = <HTMLDivElement>document.getElementById("servicPreviewHeader");
    if (typeof (element) == "undefined") return 0;
    var result = (window.innerHeight
      - 64 // navbar
      - element.offsetHeight // header
      - 2 * this.gap
    ) / 2;
    return result;
  }

  get serviceType(): string {
    switch (this.service.constructor) {
      case BlockStorageService: return "Block Storage Service";
      case DirectAttachedService: return "Direct Attached Service";
      case KeyValueStorageService: return "Key Value Storage Service";
      case ObjectStorageService: return "Object Storage Service";
      case OnlineDriveStorageService: return "Online Drive Storge Service";
      case RelationalDatabaseService: return "Relational Database Storage Service";
    }
    return null;
  }

  setService(service: any) {
    this.servicePointer = service.id;
  }

  toggleSidebar() {
    if (this.collapseSidebar) this.collapseSidebar = false;
    else this.collapseSidebar = true;
  }

  /**
   * the method saves the current progress in a project
   */
  saveProject(){
    this.projectEmitter.emit(this.project);
  }
  /**
   * the method navigates to the use case selection step
   */
  toUseCaseSelection(){
    this.gotoUseCaseEmitter.emit();
  }

  categorySetted(): boolean {
    if(this.service.cloudServiceCategory != null && typeof(this.service.cloudServiceCategory) != "undefined") return true;
    return false;
  }

  modelSetted(): boolean {
    if(this.service.cloudServiceModel != null && typeof(this.service.cloudServiceModel) != "undefined") return true;
    return false;
  }

  providerSetted(): boolean {
    if(this.service.provider != null && typeof(this.service.provider) != "undefined") return true;
    return false;
  }

  storageTypeSetted(): boolean {
    if(this.service.storageType != null && typeof(this.service.storageType) != "undefined") return true;
    return false;
  }

  renderDough(){
    var parent = document.getElementById("fulfillment-dough-parent");
    if (parent == null) return;
    parent.innerHTML = "";
    var element = document.createElement("canvas");
    element.setAttribute("id", "fulfillment-dough");
    parent.appendChild(element);
    var ctx = element.getContext("2d");
    var m = this.matchingResponse;
    var percentage = Math.round((this.matchingResponse.points / this.project.total) * 100);
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
    (<HTMLDivElement>document.getElementById("fulfillment-dough-counter")).innerHTML = percentage.toString() + "%";
  }

  renderNet(){
    var parent = document.getElementById("fulfillment-net-parent");
    if (parent == null) return;
    parent.innerHTML = "";
    var element = document.createElement("canvas");
    element.setAttribute("id", "fulfillment-net");
    parent.appendChild(element);
    var ctx = element.getContext("2d");
    var m = this.matchingResponse;
    var labels = [];
    var data: ChartDataSets[] = [
      {
        data: [],
        label: "Gewichtung"
      }, {
        data: [],
        borderColor: "rgb(32, 153, 64)",
        backgroundColor: "rgba(32, 153, 64, .2)",
        label: "Erfüllungsgrad Suchanfrage"
      }
    ];
    if(this.project.categoryPriority > 0){
      labels.push("Kategorie");
      data[0].data.push(this.project.categoryPriority);
      data[1].data.push(m.pointscategories);
    }
    if(this.project.certificatePriority > 0){
      labels.push("Zertifizierung");
      data[0].data.push(this.project.certificatePriority);
      data[1].data.push(m.pointscertificates);
    }
    if(this.project.dataLocationPriority > 0){
      labels.push("Lokalisierung");
      data[0].data.push(this.project.dataLocationPriority);
      data[1].data.push(m.pointsdatalocations);
    }
    if(this.project.deploymentInfoPriority > 0){
      labels.push("Deployment");
      data[0].data.push(this.project.deploymentInfoPriority);
      data[1].data.push(m.pointsdeploymentinfos);
    }
    if(this.project.modelPriority > 0){
      labels.push("Servicemodell");
      data[0].data.push(this.project.modelPriority);
      data[1].data.push(m.pointsmodels);
    }
    if(this.project.providerPriority > 0){
      labels.push("Anbieter");
      data[0].data.push(this.project.providerPriority);
      data[1].data.push(m.pointsproviders);
    }
    if(this.project.storageTypePriority > 0){
      labels.push("Speichertyp");
      data[0].data.push(this.project.storageTypePriority);
      data[1].data.push(m.pointsstoragetype);
    }
    if(this.project.automatedSynchronisationPriority > 0){
      labels.push("Automatische Synchronisierung");
      data[0].data.push(this.project.automatedSynchronisationPriority);
      data[1].data.push(m.pointsHasAutomatedSynchronisation);
    }
    if(this.project.dBMSPriority > 0){
      labels.push("Datenbankmanagementsystem");
      data[0].data.push(this.project.dBMSPriority);
      data[1].data.push(m.pointsHasDBMS);
    }
    if(this.project.fileCompressionPriority > 0){
      labels.push("Dateikomprimierung");
      data[0].data.push(this.project.fileCompressionPriority);
      data[1].data.push(m.pointsHasFileCompression);
    }
    if(this.project.fileEncryptionPriority > 0){
      labels.push("Dateiverschlüsselung");
      data[0].data.push(this.project.fileEncryptionPriority);
      data[1].data.push(m.pointsHasFileEncryption);
    }
    if(this.project.fileLockingPriority > 0){
      labels.push("Filelocking");
      data[0].data.push(this.project.fileLockingPriority);
      data[1].data.push(m.pointsHasFileLocking);
    }
    if(this.project.filePermissionsPriority > 0){
      labels.push("Dateiberechtigungen");
      data[0].data.push(this.project.filePermissionsPriority);
      data[1].data.push(m.pointsHasFilePermissions);
    }
    if(this.project.fileVersioningPriority > 0){
      labels.push("Dateiversionierung");
      data[0].data.push(this.project.fileVersioningPriority);
      data[1].data.push(m.pointsHasFileVersioning);
    }
    if(this.project.replicationPriority > 0){
      labels.push("Replikation");
      data[0].data.push(this.project.replicationPriority);
      data[1].data.push(m.pointsHasReplication);
    }
    new Chart(ctx, {
      type: "radar",
      data: {
        datasets: data,
        labels: labels
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
        scale: {
          ticks: {
            min: 0,
            max: 3
          }
        },
        responsive: true
      }
    });
  }
}