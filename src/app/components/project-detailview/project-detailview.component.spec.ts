import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailviewComponent } from './project-detailview.component';

describe('ProjectDetailviewComponent', () => {
  let component: ProjectDetailviewComponent;
  let fixture: ComponentFixture<ProjectDetailviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
