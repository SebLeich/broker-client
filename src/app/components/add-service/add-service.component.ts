import { Component, Input, OnInit } from '@angular/core';
import { CloudServiceType } from '../../classes/metadata';
import {
  BlockStorageService, 
  DirectAttachedService, 
  IService, 
  KeyValueStorageService,
  ObjectStorageService,
  OnlineDriveStorageService,
  RelationalDatabaseService,
  Service 
} from 'src/app/classes/service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})

export class AddServiceComponent implements OnInit {

  public object: Service = null;

  public linear: boolean = true;

  public editMode: boolean = true;

  /**
   * the attribute contains whether the user is logged in or not
   */
  @Input() isLoggedIn;
  /**
   * the input value sets the service categories
   */
  @Input() serviceCategories;
  /**
   * the input value sets the service providers
   */
  @Input() serviceProviders;

  public types: CloudServiceType[] = [
    new CloudServiceType({ "name": "Block Storage Service", "type": BlockStorageService }),
    new CloudServiceType({ "name": "Direct Attached Storage", "type": DirectAttachedService }),
    new CloudServiceType({ "name": "Key Value Storage", "type": KeyValueStorageService }),
    new CloudServiceType({ "name": "Object Storage", "type": ObjectStorageService }),
    new CloudServiceType({ "name": "Online Drive Storage", "type": OnlineDriveStorageService }),
    new CloudServiceType({ "name": "Relational Database", "type": RelationalDatabaseService })
  ];

  constructor() { }

  ngOnInit() {
  }

  get services(): Service[] {
    if(this.object == null) return [];
    return [ this.object ];
  }

  setType(stepper: MatStepper, Class: IService){
    this.object = new Class();
    stepper.next();
  }
}
