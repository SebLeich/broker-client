import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCreateViewComponent } from './service-create-view.component';

describe('ServiceCreateViewComponent', () => {
  let component: ServiceCreateViewComponent;
  let fixture: ComponentFixture<ServiceCreateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCreateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
