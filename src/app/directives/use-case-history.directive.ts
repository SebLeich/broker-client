import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appUseCaseHistory]'
})

export class UseCaseHistoryDirective {

  constructor(public viewContainerRef: ViewContainerRef) {

  }
}