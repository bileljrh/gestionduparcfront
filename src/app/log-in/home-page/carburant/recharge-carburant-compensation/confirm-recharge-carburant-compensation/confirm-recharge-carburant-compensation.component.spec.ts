import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRechargeCarburantCompensationComponent } from './confirm-recharge-carburant-compensation.component';

describe('ConfirmRechargeCarburantCompensationComponent', () => {
  let component: ConfirmRechargeCarburantCompensationComponent;
  let fixture: ComponentFixture<ConfirmRechargeCarburantCompensationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRechargeCarburantCompensationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRechargeCarburantCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
