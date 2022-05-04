import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeQuotaMensuelComponent } from './recharge-quota-mensuel.component';

describe('RechargeQuotaMensuelComponent', () => {
  let component: RechargeQuotaMensuelComponent;
  let fixture: ComponentFixture<RechargeQuotaMensuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeQuotaMensuelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeQuotaMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
