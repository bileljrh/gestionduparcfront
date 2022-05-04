import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeCarburantCompensationComponent } from './recharge-carburant-compensation.component';

describe('RechargeCarburantCompensationComponent', () => {
  let component: RechargeCarburantCompensationComponent;
  let fixture: ComponentFixture<RechargeCarburantCompensationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeCarburantCompensationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeCarburantCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
