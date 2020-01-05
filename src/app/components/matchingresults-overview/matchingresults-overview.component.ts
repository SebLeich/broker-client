import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchingResponse } from 'src/app/classes/search';
import { Project } from 'src/app/classes/project';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-matchingresults-overview',
  templateUrl: './matchingresults-overview.component.html',
  styleUrls: ['./matchingresults-overview.component.css']
})
export class MatchingresultsOverviewComponent implements OnInit {

  private _project: Project;

  @Input() set currentProject(project: Project){
    this._project = project;
  }

  @Output() matchingResponseEmitter = new EventEmitter<MatchingResponse>();

  get currentProject(): Project {
    return this._project;
  }

  constructor() { }
  /**
   * the method navigates to the matching response detail view
   */
  gotoMatchingResponseDetailView(matchingResponse: MatchingResponse){
    this.matchingResponseEmitter.emit(matchingResponse);
  }
  /**
   * the method returns all matching responses
   */
  get matchingResponses(): MatchingResponse[] {
    return this.currentProject.matchingResponse;
  }
  /**
   * the method returns all matching responses sorted according to their fulfillment
   */
  get sortedMatchingResponses(): MatchingResponse[] {
    return this.matchingResponses.sort((a, b) => {
      var percentageA = this.percentage(a);
      var percentageB = this.percentage(b);
      if(percentageA < percentageB) return 1;
      else if(percentageA > percentageB) return -1;
      else return 0;
    });
  }
  /**
   * the method calculates the matching attributes for a search
   */
  matchesAssoz(matchingResponse: MatchingResponse): any{
    var output = { matches: [], missing: [] };
    if(this.currentProject.automatedSynchronisationPriority > 0){
      if(matchingResponse.pointsHasAutomatedSynchronisation) output.matches.push("Automatische Synchronisation");
      else output.missing.push("Automatische Synchronisation");
    }
    if(this.currentProject.dBMSPriority > 0){
      if(matchingResponse.pointsHasDBMS) output.matches.push("Datenbankmanagementsystem");
      else output.missing.push("Datenbankmanagementsystem");
    }
    if(this.currentProject.fileCompressionPriority > 0){
      if(matchingResponse.pointsHasFileCompression) output.matches.push("Dateikomprimierung");
      else output.missing.push("Dateikomprimierung");
    }
    if(this.currentProject.fileEncryptionPriority > 0){
      if(matchingResponse.pointsHasFileEncryption) output.matches.push("Dateiverschlüsselung");
      else output.missing.push("Dateiverschlüsselung");
    }
    if(this.currentProject.fileLockingPriority > 0){
      if(matchingResponse.pointsHasFileLocking) output.matches.push("Filelocking");
      else output.missing.push("Filelocking");
    }
    if(this.currentProject.filePermissionsPriority > 0){
      if(matchingResponse.pointsHasFilePermissions) output.matches.push("Dateiberechtigungen");
      else output.missing.push("Dateiberechtigungen");
    }
    if(this.currentProject.fileVersioningPriority > 0){
      if(matchingResponse.pointsHasFileVersioning) output.matches.push("Dateiversionierung");
      else output.missing.push("Dateiversionierung");
    }
    if(this.currentProject.replicationPriority > 0){
      if(matchingResponse.pointsHasReplication) output.matches.push("Replikation");
      else output.missing.push("Replikation");
    }
    if(this.currentProject.categoryPriority > 0){
      output.matches.push.apply(this.currentProject.categories.filter(x => matchingResponse.service.cloudServiceCategoryId == x.id).map(x => x.toString()));
      output.missing.push.apply(this.currentProject.categories.filter(x => matchingResponse.service.cloudServiceCategoryId != x.id).map(x => x.toString()));
    }
    if(this.currentProject.certificatePriority > 0){
      Array.prototype.push.apply(output.matches, this.currentProject.certificates.filter(x => typeof(matchingResponse.service.certificates.find(y => y.id == x.id)) != "undefined").map(x => x.toString()));
      Array.prototype.push.apply(output.missing, this.currentProject.certificates.filter(x => typeof(matchingResponse.service.certificates.find(y => y.id == x.id)) == "undefined").map(x => x.toString()));
    }
    if(this.currentProject.dataLocationPriority > 0){
      Array.prototype.push.apply(output.matches, this.currentProject.dataLocations.filter(x => typeof(matchingResponse.service.dataLocations.find(y => y.id == x.id)) != "undefined").map(x => x.toString()));
      Array.prototype.push.apply(output.missing, this.currentProject.dataLocations.filter(x => typeof(matchingResponse.service.dataLocations.find(y => y.id == x.id)) == "undefined").map(x => x.toString()));
    }
    if(this.currentProject.deploymentInfoPriority > 0){
      output.matches.push.apply(this.currentProject.deploymentInfos.filter(x => matchingResponse.service.deploymentInfoId == x.id).map(x => "Deployment: " + x.toString()));
      output.missing.push.apply(this.currentProject.deploymentInfos.filter(x => matchingResponse.service.deploymentInfoId != x.id).map(x => "Deployment: " + x.toString()));
    }
    if(this.currentProject.providerPriority > 0){
      output.matches.push.apply(this.currentProject.providers.filter(x => matchingResponse.service.providerId == x.id).map(x => "Anbieter: " + x.toString()));
      output.missing.push.apply(this.currentProject.providers.filter(x => matchingResponse.service.providerId != x.id).map(x => "Anbieter: " + x.toString()));
    }

    return output;
  }

  log(o){
    console.log(o);
  }

  ngOnInit() {
    setTimeout(() => {
      for(let element of this.matchingResponses){
        if(!element.hasService()) continue;
        this.renderDough(element);
      }
    }, 200);
  }
  /**
   * the method calculates the matching percentage of a matching response
   */
  percentage(matchingResponse: MatchingResponse): number {
    return Math.round((matchingResponse.points / this.currentProject.total)*100);
  }
  /**
   * the method renders a dough nut chart to the matching response tile
   */
  renderDough(matchingResponse: MatchingResponse){
    console.log(matchingResponse);
    var parent = document.getElementById("chart-parent-" + matchingResponse.service.id);
    if (parent == null) return;
    parent.innerHTML = "";
    var element = document.createElement("canvas");
    element.setAttribute("id", "fulfillment-dough-" + matchingResponse.service.id);
    parent.appendChild(element);
    var percentage = this.percentage(matchingResponse);
    console.log(percentage);
    var ctx = element.getContext("2d");
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
    (<HTMLDivElement>document.getElementById("chart-parent-counter-" + matchingResponse.service.id)).innerHTML = percentage.toString() + "%";
  }
  /**
   * the method returns the matching response pretty class name
   */
  typeName(response: MatchingResponse){
    return response.localType.prettyName;
  }
}
