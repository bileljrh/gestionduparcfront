import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRegulationStockComponent } from './details-regulation-stock.component';

describe('DetailsRegulationStockComponent', () => {
  let component: DetailsRegulationStockComponent;
  let fixture: ComponentFixture<DetailsRegulationStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsRegulationStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRegulationStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
