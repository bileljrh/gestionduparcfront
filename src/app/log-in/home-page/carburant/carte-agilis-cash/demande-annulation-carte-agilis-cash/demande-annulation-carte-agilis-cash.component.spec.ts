import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemandeAnnulationCarteAgilisCashComponent} from './demande-annulation-carte-agilis-cash.component';

describe('DemandeAnnulationCarteAgilisCashComponent', () => {
  let component: DemandeAnnulationCarteAgilisCashComponent;
  let fixture: ComponentFixture<DemandeAnnulationCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeAnnulationCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeAnnulationCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
