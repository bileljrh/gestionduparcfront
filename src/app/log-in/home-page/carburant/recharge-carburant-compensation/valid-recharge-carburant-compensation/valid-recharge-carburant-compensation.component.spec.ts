import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidRechargeCarburantCompensationComponent } from './valid-recharge-carburant-compensation.component';

describe('ValidRechargeCarburantCompensationComponent', () => {
  let component: ValidRechargeCarburantCompensationComponent;
  let fixture: ComponentFixture<ValidRechargeCarburantCompensationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidRechargeCarburantCompensationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidRechargeCarburantCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
