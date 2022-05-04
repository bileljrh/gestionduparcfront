import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidRechargeQuotaMensuelComponent } from './valid-recharge-quota-mensuel.component';

describe('ValidRechargeQuotaMensuelComponent', () => {
  let component: ValidRechargeQuotaMensuelComponent;
  let fixture: ComponentFixture<ValidRechargeQuotaMensuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidRechargeQuotaMensuelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidRechargeQuotaMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
