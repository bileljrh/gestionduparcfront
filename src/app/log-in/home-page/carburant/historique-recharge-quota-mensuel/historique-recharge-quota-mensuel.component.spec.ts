import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueRechargeQuotaMensuelComponent } from './historique-recharge-quota-mensuel.component';

describe('HistoriqueRechargeQuotaMensuelComponent', () => {
  let component: HistoriqueRechargeQuotaMensuelComponent;
  let fixture: ComponentFixture<HistoriqueRechargeQuotaMensuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueRechargeQuotaMensuelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueRechargeQuotaMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
