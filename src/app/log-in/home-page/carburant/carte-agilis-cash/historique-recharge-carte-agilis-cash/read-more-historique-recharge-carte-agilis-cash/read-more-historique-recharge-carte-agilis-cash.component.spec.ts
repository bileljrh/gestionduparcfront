import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReadMoreHistoriqueRechargeCarteAgilisCashComponent} from './read-more-historique-recharge-carte-agilis-cash.component';

describe('ReadMoreHistoriqueRechargeCarteAgilisCashComponent', () => {
  let component: ReadMoreHistoriqueRechargeCarteAgilisCashComponent;
  let fixture: ComponentFixture<ReadMoreHistoriqueRechargeCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreHistoriqueRechargeCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreHistoriqueRechargeCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
