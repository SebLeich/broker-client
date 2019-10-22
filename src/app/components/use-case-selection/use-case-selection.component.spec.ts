import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseSelectionComponent } from './use-case-selection.component';

describe('UseCaseSelectionComponent', () => {
  let component: UseCaseSelectionComponent;
  let fixture: ComponentFixture<UseCaseSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseCaseSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
