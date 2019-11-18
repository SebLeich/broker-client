import { Component, AfterViewInit} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-use-case',
  templateUrl: './use-case.component.html',
  styleUrls: ['./use-case.component.css']
})
export class UseCaseComponent implements AfterViewInit {

  public o: any;

  constructor() {
    
  }

  private readonly _stateHandle = new Subject<any>();

  setState: Observable<any> = this._stateHandle.asObservable();

  ngAfterViewInit() {

  }

  select(){
    this._stateHandle.next(this);
  }
}
