import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationRechargeCarburantCompensationComponent } from './notification-recharge-carburant-compensation.component';

describe('NotificationRechargeCarburantCompensationComponent', () => {
  let component: NotificationRechargeCarburantCompensationComponent;
  let fixture: ComponentFixture<NotificationRechargeCarburantCompensationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationRechargeCarburantCompensationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationRechargeCarburantCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
