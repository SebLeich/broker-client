import { Component, OnInit, Input } from '@angular/core';
import { Chart, ChartDataSets } from 'chart.js';
import { BlockStorageService, DirectAttachedService, ObjectStorageService, OnlineDriveStorageService, RelationalDatabaseService, KeyValueStorageService } from 'src/app/classes/service';

@Component({
  selector: 'app-service-detail-view',
  templateUrl: './service-detail-view.component.html',
  styleUrls: ['./service-detail-view.component.css']
})
export class ServiceDetailViewComponent implements OnInit {

  @Input() service: any;

  @Input() currentMatchingResponse: any;

  @Input() currentProject: any;

  constructor() { }

  categorySetted(): boolean {
    if(this.service.cloudServiceCategory != null && typeof(this.service.cloudServiceCategory) != "undefined") return true;
    return false;
  }

  hasAutomatedSynchronisation(): boolean {
    switch(this.service.constructor){
      case OnlineDriveStorageService:
        return true;
    }
    return false;
  }

  hasDBMS(): boolean {
    switch(this.service.constructor){
      case KeyValueStorageService:
      case RelationalDatabaseService:
        return true;
    }
    return false;
  }

  hasFileCompression(): boolean {
    switch(this.service.constructor){
      case DirectAttachedService:
        return true;
    }
    return false;
  }

  hasFileEncryption(): boolean {
    switch(this.service.constructor){
      case BlockStorageService:
      case DirectAttachedService:
      case ObjectStorageService:
      case OnlineDriveStorageService:
        return true;
    }
    return false;
  }

  hasFileLocking(): boolean {
    switch(this.service.constructor){
      case DirectAttachedService:
      case ObjectStorageService:
        return true;
    }
    return false;
  }

  hasFilePermissions(): boolean {
    switch(this.service.constructor){
      case DirectAttachedService:
      case ObjectStorageService:
      case OnlineDriveStorageService:
        return true;
    }
    return false;
  }

  hasFileVersioning(): boolean {
    switch(this.service.constructor){
      case ObjectStorageService:
      case OnlineDriveStorageService:
        return true;
    }
    return false;
  }

  hasReplication(): boolean {
    switch(this.service.constructor){
      case BlockStorageService:
      case DirectAttachedService:
      case KeyValueStorageService:
      case ObjectStorageService:
      case RelationalDatabaseService:
        return true;
    }
    return false;
  }

  hasMatchingResponse(): boolean {
    if(this.currentMatchingResponse == null || typeof(this.currentMatchingResponse) == "undefined") return false;
    return true;
  }

  hasProject(): boolean {
    if(this.currentProject == null || typeof(this.currentProject) == "undefined") return false;
    return true;
  }

  hasStorageType(): boolean {
    switch(this.service.constructor){
      case BlockStorageService:
      case DirectAttachedService:
        return true;
    }
    return false;
  }

  modelSetted(): boolean {
    if(this.service.cloudServiceModel != null && typeof(this.service.cloudServiceModel) != "undefined") return true;
    return false;
  }

  ngOnInit() {
    console.log(this, this.hasMatchingResponse(), this.hasProject());
    if(this.hasMatchingResponse() && this.hasProject()){
      setTimeout(() => {
        this.renderDough();
        this.renderNet();
      }, 200);
    }
  }

  renderDough(){
    var parent = document.getElementById("fulfillment-dough-parent");
    if (parent == null) return;
    parent.innerHTML = "";
    var element = document.createElement("canvas");
    element.setAttribute("id", "fulfillment-dough");
    parent.appendChild(element);
    var ctx = element.getContext("2d");
    var m = this.currentMatchingResponse;
    var percentage = Math.round((this.currentMatchingResponse.points / this.currentProject.total) * 100);
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
    var m = this.currentMatchingResponse;
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
    if(this.currentProject.categoryPriority > 0){
      labels.push("Kategorie");
      data[0].data.push(this.currentProject.categoryPriority);
      data[1].data.push(m.pointscategories);
    }
    if(this.currentProject.certificatePriority > 0){
      labels.push("Zertifizierung");
      data[0].data.push(this.currentProject.certificatePriority);
      data[1].data.push(m.pointscertificates);
    }
    if(this.currentProject.dataLocationPriority > 0){
      labels.push("Lokalisierung");
      data[0].data.push(this.currentProject.dataLocationPriority);
      data[1].data.push(m.pointsdatalocations);
    }
    if(this.currentProject.deploymentInfoPriority > 0){
      labels.push("Deployment");
      data[0].data.push(this.currentProject.deploymentInfoPriority);
      data[1].data.push(m.pointsdeploymentinfos);
    }
    if(this.currentProject.modelPriority > 0){
      labels.push("Servicemodell");
      data[0].data.push(this.currentProject.modelPriority);
      data[1].data.push(m.pointsmodels);
    }
    if(this.currentProject.providerPriority > 0){
      labels.push("Anbieter");
      data[0].data.push(this.currentProject.providerPriority);
      data[1].data.push(m.pointsproviders);
    }
    if(this.currentProject.storageTypePriority > 0){
      labels.push("Speichertyp");
      data[0].data.push(this.currentProject.storageTypePriority);
      data[1].data.push(m.pointsstoragetype);
    }
    if(this.currentProject.automatedSynchronisationPriority > 0){
      labels.push("Automatische Synchronisierung");
      data[0].data.push(this.currentProject.automatedSynchronisationPriority);
      data[1].data.push(m.pointsHasAutomatedSynchronisation);
    }
    if(this.currentProject.dBMSPriority > 0){
      labels.push("Datenbankmanagementsystem");
      data[0].data.push(this.currentProject.dBMSPriority);
      data[1].data.push(m.pointsHasDBMS);
    }
    if(this.currentProject.fileCompressionPriority > 0){
      labels.push("Dateikomprimierung");
      data[0].data.push(this.currentProject.fileCompressionPriority);
      data[1].data.push(m.pointsHasFileCompression);
    }
    if(this.currentProject.fileEncryptionPriority > 0){
      labels.push("Dateiverschlüsselung");
      data[0].data.push(this.currentProject.fileEncryptionPriority);
      data[1].data.push(m.pointsHasFileEncryption);
    }
    if(this.currentProject.fileLockingPriority > 0){
      labels.push("Filelocking");
      data[0].data.push(this.currentProject.fileLockingPriority);
      data[1].data.push(m.pointsHasFileLocking);
    }
    if(this.currentProject.filePermissionsPriority > 0){
      labels.push("Dateiberechtigungen");
      data[0].data.push(this.currentProject.filePermissionsPriority);
      data[1].data.push(m.pointsHasFilePermissions);
    }
    if(this.currentProject.fileVersioningPriority > 0){
      labels.push("Dateiversionierung");
      data[0].data.push(this.currentProject.fileVersioningPriority);
      data[1].data.push(m.pointsHasFileVersioning);
    }
    if(this.currentProject.replicationPriority > 0){
      labels.push("Replikation");
      data[0].data.push(this.currentProject.replicationPriority);
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

  providerSetted(): boolean {
    if(this.service.provider != null && typeof(this.service.provider) != "undefined") return true;
    return false;
  }

  storageTypeSetted(): boolean {
    if(this.service.storageType != null && typeof(this.service.storageType) != "undefined") return true;
    return false;
  }

}
