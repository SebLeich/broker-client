import { Component, ViewChild, ComponentFactoryResolver, Input, AfterViewInit } from '@angular/core';
import { UseCaseDirective } from "src/app/use-case.directive";
import { UseCase } from "../../classes/use-case";
import { UseCaseComponent } from 'src/app/use-case/use-case.component';

@Component({
  selector: 'app-use-case-selection',
  templateUrl: './use-case-selection.component.html',
  styleUrls: ['./use-case-selection.component.css']
})

export class UseCaseSelectionComponent implements AfterViewInit {
  /**
   * a set of all available use cases from the configuration
   */
  private _uc: UseCase[] = [];
  /**
   * a set of passed states
   */
  stateHistory: number[] = [];
  /**
   * the current states id
   */
  state: number = 0;
  /**
   * the input value sets the internal use case list
   */
  @Input() set useCases(useCases: UseCase[]) {
    this._uc = useCases;
    this.loadComponent()
  }
  /**
   * the use case child container providing space for all use cases
   */
  @ViewChild(UseCaseDirective, { static: true }) ucHost: UseCaseDirective;

  /**
   * the construtor creates a new instance of the component
   */
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    
  }
  /**
   * the method fills the view's dynamic content
   */
  loadComponent() {
    for (var index in this._uc) {
      const viewContainerRef = this.ucHost.viewContainerRef;
      if(index == "0") viewContainerRef.clear();

      var u = this._uc[index];

      if(!u.data.source.includes(this.state)) continue;

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(u.component);

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<UseCaseComponent>componentRef.instance).o = u.data;
      (<UseCaseComponent>componentRef.instance).setState.subscribe((u) => {
        var s = u.o.target;
        this.stateHistory.push(this.state);
        this.state = s;
        this.loadComponent();
      });
    }
  }

  ngAfterViewInit() {
    
  }
  /**
   * the method undos the last user input
   */
  undo(){
    if(this.stateHistory.length == 0) throw("no states in history");
    var s = this.stateHistory[this.stateHistory.length-1];
    this.state = s;
    this.stateHistory.splice(this.stateHistory.length-1, 1);
    this.loadComponent();
  }
}
