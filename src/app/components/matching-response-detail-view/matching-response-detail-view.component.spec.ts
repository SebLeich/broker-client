import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingResponseDetailViewComponent } from './matching-response-detail-view.component';

describe('MatchingResponseDetailViewComponent', () => {
  let component: MatchingResponseDetailViewComponent;
  let fixture: ComponentFixture<MatchingResponseDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingResponseDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingResponseDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
