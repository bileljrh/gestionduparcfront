import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRechargeQuotaMensuelComponent } from './new-recharge-quota-mensuel.component';

describe('NewRechargeQuotaMensuelComponent', () => {
  let component: NewRechargeQuotaMensuelComponent;
  let fixture: ComponentFixture<NewRechargeQuotaMensuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRechargeQuotaMensuelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRechargeQuotaMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
