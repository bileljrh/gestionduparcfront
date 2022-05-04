import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRechargeCarteAgilisCashComponent } from './confirm-recharge-carte-agilis-cash.component';

describe('ConfirmRechargeCarteAgilisCashComponent', () => {
  let component: ConfirmRechargeCarteAgilisCashComponent;
  let fixture: ComponentFixture<ConfirmRechargeCarteAgilisCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRechargeCarteAgilisCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRechargeCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
