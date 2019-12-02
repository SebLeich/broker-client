import { Component, Input, ViewChild, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { Service, BlockStorageService, DirectAttachedService, KeyValueStorageService, ObjectStorageService, OnlineDriveStorageService, RelationalDatabaseService } from 'src/app/classes/service';

@Component({
  selector: 'app-service-preview',
  templateUrl: './service-preview.component.html',
  styleUrls: ['./service-preview.component.css']
})
export class ServicePreviewComponent implements AfterContentInit {

  gap: number = 2;
  isInit: boolean = false;

  @Input() service: Service;

  @ViewChild("servicPreviewHeader", { static: true }) header: ElementRef;

  constructor() {
    setTimeout(() => this.isInit = true, 1);
  }

  ngAfterContentInit() {

  }

  onResize(){
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

  get serviceType(): string{
    switch(this.service.constructor){
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
