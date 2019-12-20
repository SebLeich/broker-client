import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { BlockStorageService, DirectAttachedService, KeyValueStorageService, ObjectStorageService, OnlineDriveStorageService, RelationalDatabaseService, IService } from 'src/app/classes/service';
import { Project } from 'src/app/classes/project';

@Component({
  selector: 'app-service-preview',
  templateUrl: './service-preview.component.html',
  styleUrls: ['./service-preview.component.css']
})
export class ServicePreviewComponent implements AfterContentInit {

  gap: number = 2;
  isInit: boolean = false;

  public lineChartData: ChartDataSets[] = [
    { data: [
      parseInt( (Math.random() * 100).toString() ),
      parseInt( (Math.random() * 100).toString() ),
      parseInt( (Math.random() * 100).toString() ),
      parseInt( (Math.random() * 100).toString() ),
      parseInt( (Math.random() * 100).toString() ),
      parseInt( (Math.random() * 100).toString() ),
    ], label: "Erfüllungsgrad Suchanfrage" }
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

  servicePointer: number = null;

  collapseSidebar: boolean = true;

  get services(): IService[]{
    var output = [];
    if(this.project != null && this.project.matchingResponses.length > 0){
      for(var index in this.project.matchingResponses){
        output.push(this.project.matchingResponses[index].service);
      }
    }
    return output;
  }

  get service(): IService{
    if(this.project != null && this.project.matchingResponses.length > 0){
      if(this.servicePointer == null){
        var s = this.project.matchingResponses[0].service;
        this.servicePointer = s.id;
        return s;
      }
      for(var index in this.project.matchingResponses){
        if(this.project.matchingResponses[index].service.id == this.servicePointer) return this.project.matchingResponses[0].service;
      }
    }
    return null;
  }

  @Output() editEmitter = new EventEmitter();

  @ViewChild("servicPreviewHeader", { static: true }) header: ElementRef;
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {
    setTimeout(() => this.isInit = true, 10);
  }

  editService(){
    this.editEmitter.emit(this.service);
  }

  ngAfterContentInit() {

  }

  onResize() {
    this.isInit = true;
  }

  get rowHeight(): number {
    var result = (window.innerHeight
      - 64 // navbar
      - this.header.nativeElement.offsetHeight // header
      - 2*this.gap
    ) / 3;
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

  setService(service: any){
    this.servicePointer = service.id;
    console.log(this.service);
  }

  toggleSidebar(){
    if(this.collapseSidebar) this.collapseSidebar = false;
    else this.collapseSidebar = true;
  }
}
