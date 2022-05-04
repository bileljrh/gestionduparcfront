import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueRechargeComplementaireComponent } from './historique-recharge-complementaire.component';

describe('HistoriqueRechargeComplementaireComponent', () => {
  let component: HistoriqueRechargeComplementaireComponent;
  let fixture: ComponentFixture<HistoriqueRechargeComplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueRechargeComplementaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueRechargeComplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
