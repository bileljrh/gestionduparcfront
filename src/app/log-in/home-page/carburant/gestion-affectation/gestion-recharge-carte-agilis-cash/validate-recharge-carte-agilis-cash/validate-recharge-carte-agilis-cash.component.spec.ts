import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateRechargeCarteAgilisCashComponent } from './validate-recharge-carte-agilis-cash.component';

describe('ValidateRechargeCarteAgilisCashComponent', () => {
  let component: ValidateRechargeCarteAgilisCashComponent;
  let fixture: ComponentFixture<ValidateRechargeCarteAgilisCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateRechargeCarteAgilisCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateRechargeCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
