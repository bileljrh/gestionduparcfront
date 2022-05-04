import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoriqueRechargeCarteAgilisCashComponent} from './historique-recharge-carte-agilis-cash.component';

describe('HistoriqueRechargeCarteAgilisCashComponent', () => {
  let component: HistoriqueRechargeCarteAgilisCashComponent;
  let fixture: ComponentFixture<HistoriqueRechargeCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueRechargeCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueRechargeCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
