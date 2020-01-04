import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingresultsOverviewComponent } from './matchingresults-overview.component';

describe('MatchingresultsOverviewComponent', () => {
  let component: MatchingresultsOverviewComponent;
  let fixture: ComponentFixture<MatchingresultsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingresultsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingresultsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
