import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioNewsComponent } from './portfolio-news.component';

describe('PortfolioNewsComponent', () => {
  let component: PortfolioNewsComponent;
  let fixture: ComponentFixture<PortfolioNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
