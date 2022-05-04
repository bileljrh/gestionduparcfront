import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRechargeCarburantCompensationComponent } from './delete-recharge-carburant-compensation.component';

describe('DeleteRechargeCarburantCompensationComponent', () => {
  let component: DeleteRechargeCarburantCompensationComponent;
  let fixture: ComponentFixture<DeleteRechargeCarburantCompensationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRechargeCarburantCompensationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRechargeCarburantCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
