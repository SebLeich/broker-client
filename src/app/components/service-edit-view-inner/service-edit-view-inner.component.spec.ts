import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEditViewInnerComponent } from './service-edit-view-inner.component';

describe('ServiceEditViewInnerComponent', () => {
  let component: ServiceEditViewInnerComponent;
  let fixture: ComponentFixture<ServiceEditViewInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceEditViewInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEditViewInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
