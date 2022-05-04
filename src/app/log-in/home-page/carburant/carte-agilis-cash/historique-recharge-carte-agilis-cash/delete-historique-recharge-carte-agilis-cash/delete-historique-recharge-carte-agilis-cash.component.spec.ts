import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteHistoriqueRechargeCarteAgilisCashComponent} from './delete-historique-recharge-carte-agilis-cash.component';

describe('DeleteHistoriqueRechargeCarteAgilisCashComponent', () => {
  let component: DeleteHistoriqueRechargeCarteAgilisCashComponent;
  let fixture: ComponentFixture<DeleteHistoriqueRechargeCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteHistoriqueRechargeCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHistoriqueRechargeCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
