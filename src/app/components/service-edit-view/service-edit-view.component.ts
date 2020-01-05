import { Component, EventEmitter, Input, OnInit, Output, Provider, ViewChild } from '@angular/core';
import { Service, ServiceCategory } from "../../classes/service";
import { PopUpData } from "src/app/components/pop-up/pop-up.component";
import { ServiceEditViewInnerComponent } from '../service-edit-view-inner/service-edit-view-inner.component';

@Component({
  selector: 'app-service-edit-view',
  templateUrl: './service-edit-view.component.html',
  styleUrls: ['./service-edit-view.component.css']
})
export class ServiceEditViewComponent implements OnInit {

  /**
   * available service categories
   */
  @Input() serviceCategories: ServiceCategory[];
  /**
   * all available providers
   */
  @Input() providers: Provider[];
  /**
   * the components current service
   */
  @Input() currentService: Service = null;
  /**
   * the emitter sends the state messages to the root component
   */
  @Output() messageEmitter = new EventEmitter<PopUpData>();
  /**
   * the emitter sends the current service to the root component
   */
  @Output() serviceEmitter = new EventEmitter();
  /**
   * the service edit view reference
   */
  @ViewChild(ServiceEditViewInnerComponent, { static: true }) editView: ServiceEditViewInnerComponent;
  /**
   * the method returns whether the current service is persistable or not
   */
  isPersistable(): boolean {
    return true;
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit(){

  }
  /**
   * the method saves the current service to the database
   */
  saveService(service: Service){
    console.log(service);
  }
  /**
   * the method sets the pop up message
   */
  showPopUpMessage(data: PopUpData){
    this.messageEmitter.emit(data);
  }
}