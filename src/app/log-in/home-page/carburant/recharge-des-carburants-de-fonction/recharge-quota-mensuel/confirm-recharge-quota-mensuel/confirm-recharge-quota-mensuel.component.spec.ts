import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRechargeQuotaMensuelComponent } from './confirm-recharge-quota-mensuel.component';

describe('ConfirmRechargeQuotaMensuelComponent', () => {
  let component: ConfirmRechargeQuotaMensuelComponent;
  let fixture: ComponentFixture<ConfirmRechargeQuotaMensuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRechargeQuotaMensuelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRechargeQuotaMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
