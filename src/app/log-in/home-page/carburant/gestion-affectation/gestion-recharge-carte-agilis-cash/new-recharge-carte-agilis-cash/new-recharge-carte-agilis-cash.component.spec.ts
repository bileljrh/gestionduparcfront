import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewRechargeCarteAgilisCashComponent} from './new-recharge-carte-agilis-cash.component';

describe('NewRechargeCarteAgilisCashComponent', () => {
  let component: NewRechargeCarteAgilisCashComponent;
  let fixture: ComponentFixture<NewRechargeCarteAgilisCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewRechargeCarteAgilisCashComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRechargeCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
