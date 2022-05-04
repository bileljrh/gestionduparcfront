import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteRechargeCarteAgilisCashComponent} from './delete-recharge-carte-agilis-cash.component';

describe('DeleteRechargeCarteAgilisCashComponent', () => {
  let component: DeleteRechargeCarteAgilisCashComponent;
  let fixture: ComponentFixture<DeleteRechargeCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteRechargeCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRechargeCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
