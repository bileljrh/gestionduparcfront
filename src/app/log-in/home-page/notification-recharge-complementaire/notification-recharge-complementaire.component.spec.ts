import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationRechargeComplementaireComponent } from './notification-recharge-complementaire.component';

describe('NotificationRechargeComplementaireComponent', () => {
  let component: NotificationRechargeComplementaireComponent;
  let fixture: ComponentFixture<NotificationRechargeComplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationRechargeComplementaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationRechargeComplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
