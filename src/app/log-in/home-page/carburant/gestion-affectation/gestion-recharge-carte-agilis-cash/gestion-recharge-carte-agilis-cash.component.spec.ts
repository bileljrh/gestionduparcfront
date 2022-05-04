import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionRechargeCarteAgilisCashComponent} from './gestion-recharge-carte-agilis-cash.component';

describe('GestionRechargeCarteAgilisCashComponent', () => {
  let component: GestionRechargeCarteAgilisCashComponent;
  let fixture: ComponentFixture<GestionRechargeCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionRechargeCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRechargeCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
