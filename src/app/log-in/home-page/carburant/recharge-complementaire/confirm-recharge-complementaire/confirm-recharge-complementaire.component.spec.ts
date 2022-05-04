import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRechargeComplementaireComponent } from './confirm-recharge-complementaire.component';

describe('ConfirmRechargeComplementaireComponent', () => {
  let component: ConfirmRechargeComplementaireComponent;
  let fixture: ComponentFixture<ConfirmRechargeComplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRechargeComplementaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRechargeComplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
