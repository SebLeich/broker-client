import { Component, EventEmitter, Input, Output, OnInit, ViewChild, Provider } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchVector } from 'src/app/classes/search';
import {
  atLeastOneValidator,
  SelectionComponent,
  UseCaseSelecionStep, 
  UseCaseSelectionOption, 
  PreviewOption,
  UseCaseMultipleSelectionOption 
} from 'src/app/classes/metadata';
import {
  Certificate,
  DataLocation,
  DeploymentInformation,
  ServiceModel,
  serviceMapping,
  StorageType
} from '../../classes/service';
import { MatStepper } from '@angular/material/stepper';
import { ObjectStorageService, OnlineDriveStorageService, BlockStorageService, DirectAttachedService, RelationalDatabaseService, KeyValueStorageService } from 'src/app/classes/service';
import { UseCase } from 'src/app/classes/use-case';

@Component({
  selector: 'app-searchvector-editview',
  templateUrl: './searchvector-editview.component.html',
  styleUrls: ['./searchvector-editview.component.css']
})
export class SearchvectorEditviewComponent implements OnInit {
  /**
   * the step configuration
   */
  steps: UseCaseSelecionStep[] = [];
  /**
   * the internal project attribute
   */
  private _searchVector: SearchVector = new SearchVector();
  /**
   * the method returns the current step
   */
  get currentStep() {
    return this.steps[this.stepper.selectedIndex];
  }
  /**
   * the components cloud service selection value
   */
  private cloudServiceSelectionValue: boolean = null;
  /**
   * the method returns whether the stepper can go back
   */
  canGoPrevious(): boolean {
    return this.stepper.selectedIndex > 0;
  }
  /**
   * the show settings flag
   */
  public showSettings: boolean = false;
  /**
   * the show settings flag
   */
  public useCaseSelectionEnabled: boolean = true;
  /**
   * the method returns whether the stepper can go forward
   */
  canGoForward(): boolean {
    return this.stepper.selectedIndex < (this.steps.length-1);
  }
  /**
   * a set of all available data locations
   */
  private _dl: DataLocation[] = [];
  /**
   * a set of all available service models
   */
  private _sm: ServiceModel[] = [];
  /**
   * a set of all available providers
   */
  private _prov: Provider[] = [];
  /**
   * a set of all available certificates
   */
  private _cert: Certificate[] = [];
  /**
   * a set of all available deployment informations
   */
  private _di: DeploymentInformation[] = [];
  /**
   * a set of all available storage types
   */
  private _storageTypes: StorageType[] = [];
  /**
   * returns the search vector
   */
  public get searchVector(): SearchVector {
    return this._searchVector;
  }
  /**
   * sets the search vector
   */
  public set searchVector(searchVector: SearchVector) {
    this._searchVector = searchVector;
  }
  /**
   * the input value sets the internal data location list
   */
  @Input() set dataLocations(dl: DataLocation[]) {
    this._dl = dl;
  }
  /**
   * the input value sets the internal service model list
   */
  @Input() set certificates(cert: Certificate[]) {
    this._cert = cert;
  }
  /**
   * the input value sets the internal service category list
   */
  @Input() set deploymentInformation(di: DeploymentInformation[]) {
    this._di = di;
  }
  /**
   * the input value sets the internal service model list
   */
  @Input() set serviceModels(sm: ServiceModel[]) {
    this._sm = sm;
  }
  /**
   * the input value sets the internal service category list
   */
  @Input() set providers(prov: Provider[]) {
    this._prov = prov;
  }
  /**
   * the input value sets the internal storage type list
   */
  @Input() set storageTypes(stty: StorageType[]) {
    this._storageTypes = stty;
  }
  /**
   * the input contains all use cases
   */
  @Input() useCases: UseCase[];
  /**
   * the input value returns the internal data location list
   */
  get dataLocations() : DataLocation[] {
    return this._dl;
  }
  /**
   * the input value returns the internal service model list
   */
  get serviceModels() : ServiceModel[]{
    return this._sm;
  }
  /**
   * the input value returns the internal service category list
   */
  get providers() : Provider[] {
    return this._prov;
  }
  /**
   * the input value returns the internal service model list
   */
  get certificates() : Certificate[] {
    return this._cert;
  }
  /**
   * the input value returns the internal service category list
   */
  get deploymentInformation() : DeploymentInformation[] {
    return this._di;
  }
  /**
   * the input value returns the internal service category list
   */
  get storageTypes() : StorageType[] {
    return this._storageTypes;
  }
  /**
   * the method returns all current options according to the current search vector
   */
  get currentOptions() : SelectionComponent[]{
    var output = [];
    if(this.searchVector.certificates.isSearchable){
      output.push(new UseCaseMultipleSelectionOption({
        "id": "certificates",
        "text": "Zertifikate", 
        "desc": "Welche Zertifikate kommen sollte ein Service vorweisen?", 
        "isActive": true,
        "list": this.certificates,
        "hasPriority": true,
        "priority": this.searchVector.certificates.priority
      }));
    }
    if(this.searchVector.datalocations.isSearchable){
      output.push(new UseCaseMultipleSelectionOption({
        "id": "datalocations",
        "text": "Datenspeicherorte", 
        "desc": "Welche Standorte kommen für Sie in Frage?", 
        "isActive": true,
        "list": this.dataLocations,
        "hasPriority": true,
        "priority": this.searchVector.datalocations.priority
      }));
    }
    if(this.searchVector.deploymentinfos.isSearchable){
      output.push(new UseCaseMultipleSelectionOption({
        "id": "deploymentinfos",
        "text": "Veröffentlichungsinformationen", 
        "desc": "Welche Veröffentlichungsinformationen sind Ihnen wichtig?", 
        "isActive": true,
        "list": this.deploymentInformation,
        "hasPriority": true,
        "priority": this.searchVector.deploymentinfos.priority
      }));
    }
    if(this.searchVector.models.isSearchable){
      output.push(new UseCaseMultipleSelectionOption({
        "id": "models",
        "text": "Servicemodelle", 
        "desc": "Welche Servicemodelle kommen für Sie in Frage?", 
        "isActive": true,
        "list": this.serviceModels,
        "hasPriority": true,
        "priority": this.searchVector.models.priority
      }));
    }
    if(this.searchVector.providers.isSearchable){
      output.push(new UseCaseMultipleSelectionOption({
        "id": "providers",
        "text": "Anbieter", 
        "desc": "Welche Anbieter kommen für Sie in Frage?", 
        "isActive": true,
        "list": this.providers,
        "hasPriority": true,
        "priority": this.searchVector.providers.priority
      }));
    }
    if(this.searchVector.storageType.isSearchable){
      output.push(new UseCaseMultipleSelectionOption({
        "id": "storageType",
        "text": "Speicherart", 
        "desc": "Welche Speicherart wünschen Sie?", 
        "isActive": true,
        "list": this.storageTypes,
        "hasPriority": true,
        "priority": this.searchVector.storageType.priority
      }));
    }
    if(this.searchVector.hasFileEncryption.isSearchable){
      output.push(new UseCaseSelectionOption({
        "id": "hasFileEncryption",
        "text": "Dateiverschlüsselung", 
        "desc": "Wünschen Sie Dateiverschlüsselung?", 
        "isActive": true,
        "hasPriority": true,
        "priority": this.searchVector.hasFileEncryption.priority
      }));
    }
    if(this.searchVector.hasReplication.isSearchable){
      output.push(new UseCaseSelectionOption({
        "id": "hasReplication",
        "text": "File Replication", 
        "desc": "Wünschen Sie File Replication?", 
        "isActive": true,
        "hasPriority": true,
        "priority": this.searchVector.hasReplication.priority
      }));
    }
    if(this.searchVector.hasAutomatedSynchronisation.isSearchable){
      output.push(new UseCaseSelectionOption({
        "id": "hasAutomatedSynchronisation",
        "text": "Automatische Synchronisation", 
        "desc": "Wünschen Sie automatische Synchronisation?", 
        "isActive": true,
        "hasPriority": true,
        "priority": this.searchVector.hasAutomatedSynchronisation.priority
      }));
    }
    if(this.searchVector.hasDBMS.isSearchable){
      output.push(new UseCaseSelectionOption({
        "id": "hasDBMS",
        "text": "Datenbankmanagementsystem", 
        "desc": "Wünschen Sie ein Datenbankmanagementsystem?", 
        "isActive": true,
        "hasPriority": true,
        "priority": this.searchVector.hasDBMS.priority
      }));
    }
    if(this.searchVector.hasFileCompression.isSearchable){
      output.push(new UseCaseSelectionOption({
        "id": "hasFileCompression",
        "text": "Dateikomprimierung", 
        "desc": "Wünschen Sie Dateikomprimierung?", 
        "isActive": true,
        "hasPriority": true,
        "priority": this.searchVector.hasFileCompression.priority
      }));
    }
    if(this.searchVector.hasFileLocking.isSearchable){
      output.push(new UseCaseSelectionOption({
        "id": "hasFileLocking",
        "text": "Filelocking", 
        "desc": "Wünschen Sie Filelocking?", 
        "isActive": true,
        "hasPriority": true,
        "priority": this.searchVector.hasFileLocking.priority
      }));
    }
    if(this.searchVector.hasFilePermissions.isSearchable){
      output.push(new UseCaseSelectionOption({
        "id": "hasFilePermissions",
        "text": "Berechtigungssystem", 
        "desc": "Wünschen Sie ein Berechtigungssystem?", 
        "isActive": true,
        "hasPriority": true,
        "priority": this.searchVector.hasFilePermissions.priority
      }));
    }
    if(this.searchVector.hasFileVersioning.isSearchable){
      output.push(new UseCaseSelectionOption({
        "id": "hasFileVersioning",
        "text": "Dateiversionierung", 
        "desc": "Wünschen Sie Dateiversionierung?", 
        "isActive": true,
        "hasPriority": true,
        "priority": this.searchVector.hasFileVersioning.priority
      }));
    }
    return output;
  }
  /**
   * the method returns the current option form group
   */
  get currentOptionFg() {
    var output = {};
    if(this.searchVector.certificates.isSearchable){
      output["certificates"] = this.searchVector.certificates.value;
      output["certificates-prio"] = this.searchVector.certificates.priority;
    }
    if(this.searchVector.datalocations.isSearchable){
      output["datalocations"] = this.searchVector.datalocations.value;
      output["datalocations-prio"] = this.searchVector.datalocations.priority;
    }
    if(this.searchVector.deploymentinfos.isSearchable){
      output["deploymentinfos"] = this.searchVector.deploymentinfos.value;
      output["deploymentinfos-prio"] = this.searchVector.deploymentinfos.priority;
    }
    if(this.searchVector.models.isSearchable){
      output["models"] = this.searchVector.models.value;
      output["models-prio"] = this.searchVector.models.priority;
    }
    if(this.searchVector.providers.isSearchable){
      output["providers"] = this.searchVector.providers.value;
      output["providers-prio"] = this.searchVector.providers.priority;
    }
    if(this.searchVector.storageType.isSearchable){
      output["storageType"] = this.searchVector.storageType.value;
      output["storageType-prio"] = this.searchVector.storageType.priority;
    }
    if(this.searchVector.hasFileEncryption.isSearchable){
      output["hasFileEncryption"] = this.searchVector.hasFileEncryption.value;
      output["hasFileEncryption-prio"] = this.searchVector.hasFileEncryption.priority;
    }
    if(this.searchVector.hasReplication.isSearchable){
      output["hasReplication"] = this.searchVector.hasReplication.value;
      output["hasReplication-prio"] = this.searchVector.hasReplication.priority;
    }
    if(this.searchVector.hasAutomatedSynchronisation.isSearchable){
      output["hasAutomatedSynchronisation"] = this.searchVector.hasAutomatedSynchronisation.value;
      output["hasAutomatedSynchronisation-prio"] = this.searchVector.hasAutomatedSynchronisation.priority;
    }
    if(this.searchVector.hasDBMS.isSearchable){
      output["hasDBMS"] = this.searchVector.hasDBMS.value;
      output["hasDBMS-prio"] = this.searchVector.hasDBMS.priority;
    }
    if(this.searchVector.hasFileCompression.isSearchable){
      output["hasFileCompression"] = this.searchVector.hasFileCompression.value;
      output["hasFileCompression-prio"] = this.searchVector.hasFileCompression.priority;
    }
    if(this.searchVector.hasFileLocking.isSearchable){
      output["hasFileLocking"] = this.searchVector.hasFileLocking.value;
      output["hasFileLocking-prio"] = this.searchVector.hasFileLocking.priority;
    }
    if(this.searchVector.hasFilePermissions.isSearchable){
      output["hasFilePermissions"] = this.searchVector.hasFilePermissions.value;
      output["hasFilePermissions-prio"] = this.searchVector.hasFilePermissions.priority;
    }
    if(this.searchVector.hasFileVersioning.isSearchable){
      output["hasFileVersioning"] = this.searchVector.hasFileVersioning.value;
      output["hasFileVersioning-prio"] = this.searchVector.hasFileVersioning.priority;
    }
    return output;
  }
  /**
   * the method returns the current type selection form group
   */
  get currentTypeSelectionFg() {
    var output = {};
    if(this.searchVector.types.includes(BlockStorageService)){
      output["bls"] = true;
    } else {
      output["bls"] = false;
    }
    if(this.searchVector.types.includes(DirectAttachedService)){
      output["das"] = true;
    } else {
      output["das"] = false;
    }
    if(this.searchVector.types.includes(KeyValueStorageService)){
      output["kvs"] = true;
    } else {
      output["kvs"] = false;
    }
    if(this.searchVector.types.includes(ObjectStorageService)){
      output["obs"] = true;
    } else {
      output["obs"] = false;
    }
    if(this.searchVector.types.includes(OnlineDriveStorageService)){
      output["ods"] = true;
    } else {
      output["ods"] = false;
    }
    if(this.searchVector.types.includes(RelationalDatabaseService)){
      output["rds"] = true;
    } else {
      output["rds"] = false;
    }
    return output;
  }
  /**
   * the emitter for the send search callback
   */
  @Output() searchEmitter = new EventEmitter();
  /**
   * the steppers view reference
   */
  @ViewChild("stepper", { static: true }) stepper: MatStepper;
  /**
   * the construtor creates a new instance of the component
   */
  constructor(
    private _formBuilder: FormBuilder
  ) {

  }
  /**
   * the method returns whether the given object is an instance of the given object
   */
  isMultipleSelectionOption(o: any) : boolean {
    return (o.constructor == UseCaseMultipleSelectionOption);
  }
  /**
   * the method returns whether the given object is an instance of the given object
   */
  isSelectionOption(o: any) : boolean {
    return (o.constructor == UseCaseSelectionOption);
  }
  /**
   * the method returns whether the option is a preview element
   */
  isPreviewElement(o: any): boolean {
    return (o.constructor == PreviewOption);
  }
  /**
   * the method returns whether the current vector is searchable or not
   */
  isSearchable(): boolean {
    this.searchVector.applyForm(this.steps[2].fg);
    if(this.searchVector == null || typeof(this.searchVector) == "undefined") return false;
    return this.searchVector.isSearchable();
  }
  /**
   * the method loggs an object to the console
   */
  log(o){
    console.log(o);
  }
  /**
   * the method initiates the page change of the stepper
   */
  previous() {
    this.stepper.previous();
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
    this.validateSteps();
  }
  /**
   * the method unselects all options of the current search list
   */
  noSelection(element){
    this.steps[2].fg.controls[element.id].setValue([]);
  }
  /**
   * the method sends the current search to the server
   */
  sendSearch() {
    this.searchVector.applyForm(this.steps[2].fg);
    this.searchEmitter.emit(this.searchVector);
  }
  /**
   * the method toggles the search input mode
   */
  toggleInputMode(value){
    this.useCaseSelectionEnabled = value;
    this.validateSteps();
  }
  /**
   * the method validates the current steps
   */
  validateSteps(){
    this.steps = [];
    var cSFg = this._formBuilder.group({
      1: [this.cloudServiceSelectionValue, Validators.requiredTrue],
      2: [false, Validators.required]
    });
    cSFg.valueChanges.subscribe((values) => {
      this.cloudServiceSelectionValue = values[1];
    });
    this.steps.push(
      new UseCaseSelecionStep({
        "id": 1,
        "headline": "Welche Klasse von Cloud Services suchen Sie?",
        "options": [
          new PreviewOption({
            "id": 1, "text": "Cloud Storage", "icon": "filter_drama", "desc": "Cloud-Storage ist ein Servicemodell, in dem Daten an einem Remote-Standort gepflegt, verwaltet, gesichert und Benutzern über ein Netzwerk (meist das Internet) zur Verfügung gestellt werden.", "isActive": true
          }),
          new PreviewOption({
            "id": 2, "text": "Online Collaboration", "icon": "supervised_user_circle", "desc": "Online Collaboration umfasst Tools für die Zusammenarbeit mit anderen Nutzern über Netzwerke, meistens über das Internet.", "isActive": false
          })
        ],
        "fg": cSFg
      })
    );
    if(this.useCaseSelectionEnabled){
      var options: PreviewOption[] = [];
      var fgConfig = { };
      var index = 1;
      for(let useCase of this.useCases){
        options.push(new PreviewOption({
          "id": useCase.id,
          "icon": null,
          "text": useCase.title, 
          "isActive": true,
          "customClass": "use-case",
          "index": index
        }));
        fgConfig[useCase.id] = false;
        index++;
      }
      var tSFg = this._formBuilder.group(fgConfig, {
        validators: atLeastOneValidator()
      });
      tSFg.valueChanges.subscribe((values) => {
        this.searchVector.reset();
        for(var index in values){
          if(values[index] == true){
            var useCase = this.useCases.find(x => x.id == parseInt(index));
            for(let type of useCase.serviceClasses) this.searchVector.addType(serviceMapping[type.name]);
          }
        }
        this.steps[2] = new UseCaseSelecionStep({
          "id": 3,
          "headline": "Welche Anforderungen haben sie?",
          "options": this.currentOptions,
          "fg": this._formBuilder.group(this.currentOptionFg)
        });
      });
      this.steps.push(
        new UseCaseSelecionStep({
          "id": 2,
          "headline": "Welchen Aussagen stimmen Sie zu?",
          "options": options,
          "fg": tSFg
        })
      );
    } else {
      var tSFg = this._formBuilder.group(this.currentTypeSelectionFg, {
        validators: atLeastOneValidator()
      });
      tSFg.valueChanges.subscribe((values) => {
        this.searchVector.reset();
        for(var index in values){
          if(values[index] == true){
            this.searchVector.addType(serviceMapping[index]);
          }
        }
        this.steps[2] = new UseCaseSelecionStep({
          "id": 3,
          "headline": "Welche Anforderungen haben sie?",
          "options": this.currentOptions,
          "fg": this._formBuilder.group(this.currentOptionFg)
        });
      });
      this.steps.push(
        new UseCaseSelecionStep({
          "id": 2,
          "headline": "Welche Arten sind für Sie interessant?",
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
        })
      );
    }
    this.steps.push(
      new UseCaseSelecionStep({
        "id": 3,
        "headline": "Welche Anforderungen haben sie?",
        "options": this.currentOptions,
        "fg": this._formBuilder.group(this.currentOptionFg)
      })
    );
  }
}
