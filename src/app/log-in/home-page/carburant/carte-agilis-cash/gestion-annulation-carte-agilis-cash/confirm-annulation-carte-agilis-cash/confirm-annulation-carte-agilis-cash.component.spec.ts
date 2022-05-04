import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmAnnulationCarteAgilisCashComponent} from './confirm-annulation-carte-agilis-cash.component';

describe('ConfirmAnnulationCarteAgilisCashComponent', () => {
  let component: ConfirmAnnulationCarteAgilisCashComponent;
  let fixture: ComponentFixture<ConfirmAnnulationCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmAnnulationCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAnnulationCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
