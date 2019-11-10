import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseComponent } from './use-case.component';

describe('UseCaseComponent', () => {
  let component: UseCaseComponent;
  let fixture: ComponentFixture<UseCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
