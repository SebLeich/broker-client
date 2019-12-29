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

  _sP: number = null;

  set servicePointer(value: number) {
    this._sP = value;
    var element = <HTMLCanvasElement>document.getElementById("fulfillment-dough");
    if (element == null) return;
    var m = this.matchingResponse;
    var ctx = element.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [{
          data: [m.percentage, (100 - m.percentage)],
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
    (<HTMLDivElement>document.getElementById("fulfillment-dough-counter")).innerHTML = m.percentage.toString() + "%";
    element = <HTMLCanvasElement>document.getElementById("fulfillment-net");
    if (element == null) return;
    var ctx = element.getContext("2d");
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
    if(m.prioritycategories > 0){
      labels.push("Kategorie");
      data[0].data.push(m.prioritycategories);
      data[1].data.push(m.pointscategories);
    }
    if(m.prioritycertificates > 0){
      labels.push("Zertifizierung");
      data[0].data.push(m.prioritycertificates);
      data[1].data.push(m.pointscertificates);
    }
    if(m.prioritydatalocations > 0){
      labels.push("Lokalisierung");
      data[0].data.push(m.prioritydatalocations);
      data[1].data.push(m.pointsdatalocations);
    }
    if(m.prioritydeploymentinfos > 0){
      labels.push("Deployment");
      data[0].data.push(m.prioritydeploymentinfos);
      data[1].data.push(m.pointsdeploymentinfos);
    }
    if(m.prioritymodels > 0){
      labels.push("Servicemodell");
      data[0].data.push(m.prioritymodels);
      data[1].data.push(m.pointsmodels);
    }
    if(m.priorityproviders > 0){
      labels.push("Anbieter");
      data[0].data.push(m.priorityproviders);
      data[1].data.push(m.pointsproviders);
    }
    if(m.prioritystoragetype > 0){
      labels.push("Speichertyp");
      data[0].data.push(m.prioritystoragetype);
      data[1].data.push(m.pointsstoragetype);
    }
    if(m.priorityHasAutomatedSynchronisation > 0){
      labels.push("Automatische Synchronisierung");
      data[0].data.push(m.priorityHasAutomatedSynchronisation);
      data[1].data.push(m.pointsHasAutomatedSynchronisation);
    }
    if(m.priorityHasDBMS > 0){
      labels.push("Datenbankmanagementsystem");
      data[0].data.push(m.priorityHasDBMS);
      data[1].data.push(m.pointsHasDBMS);
    }
    if(m.priorityHasFileCompression > 0){
      labels.push("Dateikomprimierung");
      data[0].data.push(m.priorityHasFileCompression);
      data[1].data.push(m.pointsHasFileCompression);
    }
    if(m.priorityHasFileEncryption > 0){
      labels.push("Dateiverschlüsselung");
      data[0].data.push(m.priorityHasFileEncryption);
      data[1].data.push(m.pointsHasFileEncryption);
    }
    if(m.priorityHasFileLocking > 0){
      labels.push("Filelocking");
      data[0].data.push(m.priorityHasFileLocking);
      data[1].data.push(m.pointsHasFileLocking);
    }
    if(m.priorityHasFilePermissions > 0){
      labels.push("Dateiberechtigungen");
      data[0].data.push(m.priorityHasFilePermissions);
      data[1].data.push(m.pointsHasFilePermissions);
    }
    if(m.priorityHasFileVersioning > 0){
      labels.push("Dateiversionierung");
      data[0].data.push(m.priorityHasFileVersioning);
      data[1].data.push(m.pointsHasFileVersioning);
    }
    if(m.priorityHasReplication > 0){
      labels.push("Replikation");
      data[0].data.push(m.priorityHasReplication);
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

  get servicePointer(): number {
    return this._sP;
  }

  collapseSidebar: boolean = true;

  get matchingResponses(): MatchingResponse[] {
    if (this.project != null) {
      return this.project.matchingResponses;
    }
    return [];
  }

  get matchingResponse(): MatchingResponse {
    if (this.project != null && this.project.matchingResponses.length > 0) {
      if (this.servicePointer == null) {
        var s = this.project.matchingResponses[0];
        this.servicePointer = s.service.id;
        return s;
      }
      for (var index in this.project.matchingResponses) {
        if (this.project.matchingResponses[index].service.id == this.servicePointer) return this.project.matchingResponses[index];
      }
    }
    return null;
  }

  get services(): IService[] {
    var output = [];
    if (this.project != null && this.project.matchingResponses.length > 0) {
      for (var index in this.project.matchingResponses) {
        output.push(this.project.matchingResponses[index].service);
      }
    }
    return output;
  }

  get service(): IService {
    if (this.project != null && this.project.matchingResponses.length > 0) {
      if (this.servicePointer == null) {
        var s = this.project.matchingResponses[0].service;
        this.servicePointer = s.id;
        return s;
      }
      for (var index in this.project.matchingResponses) {
        if (this.project.matchingResponses[index].service.id == this.servicePointer) return this.project.matchingResponses[index].service;
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
    setTimeout(() => this.servicePointer = this.project.matchingResponses[0].service.id, 100);
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
}