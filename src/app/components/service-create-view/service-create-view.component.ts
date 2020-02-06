import { Component, EventEmitter, Input, OnInit, Output, Provider, ViewChild } from '@angular/core';
import { Service } from "../../classes/service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { PopUpData } from "src/app/components/pop-up/pop-up.component";
import {
  exactlyOneValidator,
  UseCaseSelecionStep,
  UseCaseSelectionOption,
  PreviewOption,
  UseCaseMultipleSelectionOption
} from 'src/app/classes/metadata';
import { MatStepper } from '@angular/material/stepper';
import { ObjectStorageService, OnlineDriveStorageService, BlockStorageService, DirectAttachedService, RelationalDatabaseService, KeyValueStorageService } from 'src/app/classes/service';
import { ServiceEditViewInnerComponent } from '../service-edit-view-inner/service-edit-view-inner.component';
import { Feature } from 'src/app/classes/feature';

@Component({
  selector: 'app-service-create-view',
  templateUrl: './service-create-view.component.html',
  styleUrls: ['./service-create-view.component.css']
})
export class ServiceCreateViewComponent implements OnInit {
  /**
   * all available providers
   */
  @Input() providers: Provider[];
  /**
   * all available features
   */
  @Input() features: Feature[];
  /**
   * the emitter sends the state messages to the root component
   */
  @Output() messageEmitter = new EventEmitter<PopUpData>();
  /**
   * the emitter sends the current service to the root component
   */
  @Output() serviceEmitter = new EventEmitter();
  /**
   * the components current service
   */
  currentService: Service = null;
  /**
   * the step configuration
   */
  steps: UseCaseSelecionStep[] = [];
  /**
   * the type selection configuration
   */
  private _typeSelectionConfig: any = {
    "bls": false,
    "das": false,
    "kvs": false,
    "obs": false,
    "ods": false,
    "rds": false
  };
  /**
   * the method returns the current step
   */
  get currentStep() {
    return this.steps[this.stepper.selectedIndex];
  }
  /**
   * the method returns the current type selection form group
   */
  get currentTypeSelectionOption() {
    return this._typeSelectionConfig;
  }
  /**
   * the method sets the current type selection form group
   */
  set currentTypeSelectionOption(object) {
    this._typeSelectionConfig = object;
  }
  /**
   * the steppers view reference
   */
  @ViewChild("stepper", { static: true }) stepper: MatStepper;
  /**
   * the service edit view reference
   */
  @ViewChild(ServiceEditViewInnerComponent, { static: true }) editView: ServiceEditViewInnerComponent;
  /**
   * the constructor creates a new instance of the component
   */
  constructor(
    private _formBuilder: FormBuilder
  ) {

  }
  /**
   * the method returns whether the stepper can go back
   */
  canGoPrevious(): boolean {
    return (this.stepper.selectedIndex > 0 && this.currentStep.fg.valid);
  }
  /**
   * the method returns whether the stepper can go forward
   */
  canGoForward(): boolean {
    return this.stepper.selectedIndex < (this.steps.length - 1);
  }
  /**
   * the method returns the edit view form group object
   */
  get editViewFormGroup(): FormGroup {
    if(this.editView == null || typeof(this.editView) == "undefined") return this._formBuilder.group({});
    return this.editView.fg;
  }
  /**
   * the method returns whether the given object is an instance of the given object
   */
  isMultipleSelectionOption(o: any): boolean {
    return (o.constructor == UseCaseMultipleSelectionOption);
  }
  /**
   * the method returns whether the given object is an instance of the given object
   */
  isSelectionOption(o: any): boolean {
    return (o.constructor == UseCaseSelectionOption);
  }
  /**
   * the method returns whether the current service is persistable or not
   */
  isPersistable(): boolean {
    if(this.stepper.selectedIndex == 1) return true;
    return false;
  }
  /**
   * the method returns whether the option is a preview element
   */
  isPreviewElement(o: any): boolean {
    return (o.constructor == PreviewOption);
  }
  /**
   * the method initiates the page change of the stepper
   */
  next() {
    this.stepper.next();
  }
  /**
   * the method is called on component initalization
   */
  ngOnInit() {
    var tSFg = this._formBuilder.group(this.currentTypeSelectionOption, {
      validators: exactlyOneValidator()
    });
    tSFg.valueChanges.subscribe((value) => {
      if (tSFg.valid) {
        var type = (() => {
          for (var index in value) if (value[index]) {
            switch (index) {
              case "bls": return BlockStorageService;
              case "das": return DirectAttachedService;
              case "kvs": return KeyValueStorageService;
              case "ods": return OnlineDriveStorageService;
              case "obs": return ObjectStorageService;
              case "rds": return RelationalDatabaseService;
            }
          }
          return null;
        })();
        this.currentService = new type();
        this.next();
      }
    });
    this.steps.push(
      new UseCaseSelecionStep({
        "id": 1,
        "headline": "Welchen Typ möchten Sie anlegen?",
        "options": [
          new PreviewOption({
            "id": "bls", "icon": BlockStorageService.icon, "desc": "Ein Datenblock ist eine begrenzte, fallweise festgelegte Anzahl von Bits oder Bytes, die als Transporteinheit behandelt wird.", "text": "Block Storage Service", "isActive": true
          }),
          new PreviewOption({
            "id": "das", "text": "Direct Attached Storage Service", "icon": DirectAttachedService.icon, "desc": "Ein Direct Attached Storage ist ein Speicherlaufwerk, das direkt mit einem Rechner verbunden ist. Es steht exklusive für diesen Rechner zur Verfügung und bietet hohe Datentransferleistung und kurze Zugriffszeiten.", "isActive": true
          }),
          new PreviewOption({
            "id": "kvs", "text": "Key Value Storage Service", "icon": KeyValueStorageService.icon, "desc": "Eine Schlüssel-Werte-Datenbank (auch Key Value Database oder Key Value Store) dient zur elektronischen Datenverwaltung in Computersystemen und basiert auf dem Schlüssel-Werte-Datenmodell, um assoziative Datenfelder zu speichern.", "isActive": true
          }),
          new PreviewOption({
            "id": "obs", "text": "Object Storage Service", "icon": ObjectStorageService.icon, "desc": "Im Vergleich zum File-Storage wird bei Object Storage nicht nur die Datei, sondern auch die dazugehörigen Metadaten betrachtet, also das ganze Objekt. Das macht es einfacher Daten zu strukturieren.", "isActive": true
          }),
          new PreviewOption({
            "id": "ods", "text": "Online Drive Storage Service", "icon": OnlineDriveStorageService.icon, "desc": "Cloud-Speicher ist ein Modell für die Speicherung von Computerdaten, bei dem die digitalen Daten in logischen Pools gespeichert werden. Der physische Speicher erstreckt sich über mehrere Server, und die physische Umgebung gehört in der Regel einem Hosting-Unternehmen und wird von diesem verwaltet.", "isActive": true
          }),
          new PreviewOption({
            "id": "rds", "text": "Relational Database Storage Service", "icon": RelationalDatabaseService.icon, "desc": "Eine relationale Datenbank ist eine Sammlung von Datenelementen mit vordefinierten Beziehungen. Diese Elemente sind als ein Satz von Tabellen mit Spalten und Zeilen angeordnet.", "isActive": true
          })
        ],
        "fg": tSFg
      }),
      new UseCaseSelecionStep({
        "id": 2,
        "headline": "Attribute editieren",
        "isServiceEditComponent": true,
        "fg": this.editViewFormGroup
      })
    );
  }
  /**
   * the method initiates the page change of the stepper
   */
  previous() {
    this.stepper.previous();
  }
  /**
   * the method persists the current service
   */
  saveService(){
    this.serviceEmitter.emit(this.currentService);
  }
  /**
   * the method sets the pop up message
   */
  showPopUpMessage(data: PopUpData){
    this.messageEmitter.emit(data);
  }
  
}
