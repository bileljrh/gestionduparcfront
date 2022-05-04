import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRechargeCarburantCompensationComponent } from './modify-recharge-carburant-compensation.component';

describe('ModifyRechargeCarburantCompensationComponent', () => {
  let component: ModifyRechargeCarburantCompensationComponent;
  let fixture: ComponentFixture<ModifyRechargeCarburantCompensationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRechargeCarburantCompensationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRechargeCarburantCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
