import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUseCase]'
})
export class UseCaseDirective {

  constructor(public viewContainerRef: ViewContainerRef) {

  }
}