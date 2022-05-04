import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRechargeCarburantCompensationComponent } from './new-recharge-carburant-compensation.component';

describe('NewRechargeCarburantCompensationComponent', () => {
  let component: NewRechargeCarburantCompensationComponent;
  let fixture: ComponentFixture<NewRechargeCarburantCompensationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRechargeCarburantCompensationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRechargeCarburantCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
