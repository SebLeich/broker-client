import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, OnInit } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { BlockStorageService, DirectAttachedService, KeyValueStorageService, ObjectStorageService, OnlineDriveStorageService, RelationalDatabaseService, IService } from 'src/app/classes/service';
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

  public lineChartData: ChartDataSets[] = [
    {
      data: [
        parseInt((Math.random() * 100).toString()),
        parseInt((Math.random() * 100).toString()),
        parseInt((Math.random() * 100).toString()),
        parseInt((Math.random() * 100).toString()),
        parseInt((Math.random() * 100).toString()),
        parseInt((Math.random() * 100).toString()),
      ], label: "Erfüllungsgrad Suchanfrage"
    }
  ];
  public lineChartLabels: Label[] = ["Data Location", "Zertifizierung", "Verfügbarkeit", "Service Model", "Deployment", "Pricing"];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        right: 10,
        bottom: 20,
        left: 10
      }
    },
    responsive: true,
    annotation: {
    },
    scale: {
      ticks: {
        min: 0,
        max: 100
      }
    }
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(19,114,199,0.5)',
      borderColor: 'rgba(19,114,199,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'radar';

  @Input() project: Project;

  _sP: number = null;

  set servicePointer(value: number) {
    this._sP = value;
    var element = <HTMLCanvasElement>document.getElementById("fulfillment-dough");
    if (element == null) return;
    var m = this.matchingResponse;
    var ctx = element.getContext("2d");
    var c = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [{
          data: [m.percentage, (100-m.percentage)],
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
        }
      }
    });
    (<HTMLDivElement>document.getElementById("fulfillment-dough-counter")).innerHTML = m.percentage.toString() + "%";
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

  @Output() editEmitter = new EventEmitter();

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {
    setTimeout(() => this.isInit = true, 10);
  }

  classForPercentage(percentage: number): string{
    if(typeof(percentage) != "number") return "percentage-error";
    if(percentage < 30){
      return "percentage-danger";
    } else if(percentage < 60){
      return "percentage-warning";
    } else if(percentage < 80){
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
    var element = <HTMLDivElement> document.getElementById("servicPreviewHeader");
    if(typeof(element) == "undefined") return 0;
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
    console.log(service, this.servicePointer);
    console.log(this.service);
  }

  toggleSidebar() {
    if (this.collapseSidebar) this.collapseSidebar = false;
    else this.collapseSidebar = true;
  }
}
