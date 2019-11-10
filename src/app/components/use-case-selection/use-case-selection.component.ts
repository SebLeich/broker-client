import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { UseCaseDirective } from "src/app/use-case.directive";
import { UseCase } from "../../classes/use-case";
import { UseCaseComponent } from 'src/app/use-case/use-case.component';

@Component({
  selector: 'app-use-case-selection',
  templateUrl: './use-case-selection.component.html',
  styleUrls: ['./use-case-selection.component.css']
})
export class UseCaseSelectionComponent implements OnInit {

  uc: UseCase[] = [];

  state: number = 0;

  @Input() set useCases(useCases: UseCase[]) {
    this.uc = useCases;
    this.loadComponent()
  }

  @ViewChild(UseCaseDirective, { static: true }) ucHost: UseCaseDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    
  }

  loadComponent() {
    for (var index in this.uc) {
      var u = this.uc[index];
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(u.component);

      const viewContainerRef = this.ucHost.viewContainerRef;

      if(index == "0") viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<UseCaseComponent>componentRef.instance).o = u.data;
    }
  }

  ngAfterViewInit() {
    
  }

  ngOnInit() {
    
  }
}
