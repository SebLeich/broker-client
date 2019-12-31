import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditviewComponent } from './project-editview.component';

describe('ProjectEditviewComponent', () => {
  let component: ProjectEditviewComponent;
  let fixture: ComponentFixture<ProjectEditviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
