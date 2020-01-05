import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEditviewComponent } from './service-editview.component';

describe('ServiceEditviewComponent', () => {
  let component: ServiceEditviewComponent;
  let fixture: ComponentFixture<ServiceEditviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceEditviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEditviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
