import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueRechargeCarburantCompensationComponent } from './historique-recharge-carburant-compensation.component';

describe('HistoriqueRechargeCarburantCompensationComponent', () => {
  let component: HistoriqueRechargeCarburantCompensationComponent;
  let fixture: ComponentFixture<HistoriqueRechargeCarburantCompensationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueRechargeCarburantCompensationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueRechargeCarburantCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
