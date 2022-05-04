import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegulationStockComponent} from './regulation-stock.component';

describe('RegulationStockComponent', () => {
  let component: RegulationStockComponent;
  let fixture: ComponentFixture<RegulationStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegulationStockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulationStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
