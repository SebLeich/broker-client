import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchvectorEditviewComponent } from './searchvector-editview.component';

describe('SearchvectorEditviewComponent', () => {
  let component: SearchvectorEditviewComponent;
  let fixture: ComponentFixture<SearchvectorEditviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchvectorEditviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchvectorEditviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
