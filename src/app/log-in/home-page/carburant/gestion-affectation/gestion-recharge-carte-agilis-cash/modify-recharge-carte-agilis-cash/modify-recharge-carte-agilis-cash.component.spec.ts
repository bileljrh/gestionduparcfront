import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyRechargeCarteAgilisCashComponent} from './modify-recharge-carte-agilis-cash.component';

describe('ModifyRechargeCarteAgilisCashComponent', () => {
  let component: ModifyRechargeCarteAgilisCashComponent;
  let fixture: ComponentFixture<ModifyRechargeCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyRechargeCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRechargeCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
