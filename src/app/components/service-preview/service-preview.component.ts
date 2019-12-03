import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Service, BlockStorageService, DirectAttachedService, KeyValueStorageService, ObjectStorageService, OnlineDriveStorageService, RelationalDatabaseService } from 'src/app/classes/service';

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
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
    ], label: "Erfüllungsgrad" }
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

  @Input() service: Service;

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
      - this.gap
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

}
