import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueOperationDesRechargeComponent } from './historique-operation-des-recharge.component';

describe('HistoriqueOperationDesRechargeComponent', () => {
  let component: HistoriqueOperationDesRechargeComponent;
  let fixture: ComponentFixture<HistoriqueOperationDesRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueOperationDesRechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueOperationDesRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
