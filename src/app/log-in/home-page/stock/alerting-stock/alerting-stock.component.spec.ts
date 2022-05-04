import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertingStockComponent } from './alerting-stock.component';

describe('AlertingStockComponent', () => {
  let component: AlertingStockComponent;
  let fixture: ComponentFixture<AlertingStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertingStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertingStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
