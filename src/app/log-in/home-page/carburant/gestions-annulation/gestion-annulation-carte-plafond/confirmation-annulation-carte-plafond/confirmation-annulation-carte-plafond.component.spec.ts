import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmationAnnulationCartePlafondComponent} from './confirmation-annulation-carte-plafond.component';

describe('ConfirmationAnnulationCartePlafondComponent', () => {
  let component: ConfirmationAnnulationCartePlafondComponent;
  let fixture: ComponentFixture<ConfirmationAnnulationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationAnnulationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationAnnulationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
