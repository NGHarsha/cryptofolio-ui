import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcoinmodelComponent } from './searchcoinmodel.component';

describe('SearchcoinmodelComponent', () => {
  let component: SearchcoinmodelComponent;
  let fixture: ComponentFixture<SearchcoinmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchcoinmodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchcoinmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
