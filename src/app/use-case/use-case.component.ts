import { Component, AfterViewInit} from '@angular/core';
import { UseCase } from '../classes/use-case';

@Component({
  selector: 'app-use-case',
  templateUrl: './use-case.component.html',
  styleUrls: ['./use-case.component.css']
})
export class UseCaseComponent implements AfterViewInit {

  public o: UseCase;

  constructor() {
    
  }

  ngAfterViewInit() {

  }

}
