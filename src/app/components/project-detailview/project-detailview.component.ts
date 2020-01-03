import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Project } from 'src/app/classes/project';
import { Chart } from 'chart.js';
import * as globals from "../../globals";
import { MatchingResponse } from 'src/app/classes/search';

@Component({
  selector: 'app-project-detailview',
  templateUrl: './project-detailview.component.html',
  styleUrls: ['./project-detailview.component.css']
})
export class ProjectDetailviewComponent implements OnInit {

  @Input() currentProject: Project;

  @Output() projectEmitter = new EventEmitter();

  @Output() gotoOverviewEmitter = new EventEmitter();

  columns: string[] = ["category", "value"];

  constructor() { }

  editProject(){
    this.projectEmitter.emit(this.currentProject);
  }

  gotoProjectOverview(){
    this.gotoOverviewEmitter.emit();
  }

  log(o){
    console.log(o);
  }

  ngOnInit() {
    setTimeout(() => {
      this.renderBar();
      document.querySelectorAll(".count-matching-responses").forEach((counter) => {
        counter.innerHTML = this.currentProject.matchingResponse.length.toString();
      });
    }, 10);
  }

  renderBar(){
    var parent = document.getElementById("value-chart-placeholder");
    if (parent == null) return;
    parent.innerHTML = "";
    var element = document.createElement("canvas");
    element.setAttribute("id", "value-chart");
    parent.appendChild(element);
    var ctx = element.getContext("2d");
    var values = this.currentProject.sortedValues();
    var data: number[] = [];
    var labels: string[] = [];
    var backgroundColors: string[] = [];
    var borderColors: string[] = [];
    for(var index in values){
      data.push(values[index].value);
      backgroundColors.push(globals.designColors[index].med);
      borderColors.push(globals.designColors[index].full);
      labels.push(values[index].name);
    }
    new Chart(ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors,
            label: "Priorisierung"
          }
        ],
        labels: labels
      },
      options: {
        legend: {
          display: false,
          labels: {
            boxWidth: 0,
          }
        },
        layout: {
          padding: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 4,
                stepSize: 1
              }
            }
          ]
        },
        maintainAspectRatio: false,
        responsive: true
      }
    });
  }

  get sortedMatchingResponses() : MatchingResponse[] {
    return this.currentProject.matchingResponse.sort((a, b) => {
      if(a.created == null) return 1;
      else if(b.created == null) return -1;
      var vA = new Date(a.created).valueOf();
      var vB = new Date(b.created).valueOf();
      if(vA > vB) return -1;
      else if(vA < vB) return 1;
      else return 0;
    });
  }
}
