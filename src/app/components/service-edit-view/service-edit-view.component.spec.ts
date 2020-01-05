import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEditViewComponent } from './service-edit-view.component';

describe('ServiceEditViewComponent', () => {
  let component: ServiceEditViewComponent;
  let fixture: ComponentFixture<ServiceEditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceEditViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
