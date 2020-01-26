import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseManagementViewComponent } from './use-case-management-view.component';

describe('UseCaseManagementViewComponent', () => {
  let component: UseCaseManagementViewComponent;
  let fixture: ComponentFixture<UseCaseManagementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseCaseManagementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
