import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationmodelComponent } from './confirmationmodel.component';

describe('ConfirmationmodelComponent', () => {
  let component: ConfirmationmodelComponent;
  let fixture: ComponentFixture<ConfirmationmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationmodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
