import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewportfoliomodelComponent } from './newportfoliomodel.component';

describe('NewportfoliomodelComponent', () => {
  let component: NewportfoliomodelComponent;
  let fixture: ComponentFixture<NewportfoliomodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewportfoliomodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewportfoliomodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
