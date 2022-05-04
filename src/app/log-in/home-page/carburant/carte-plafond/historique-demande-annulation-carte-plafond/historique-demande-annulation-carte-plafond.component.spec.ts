import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoriqueDemandeAnnulationCartePlafondComponent} from './historique-demande-annulation-carte-plafond.component';

describe('HistoriqueDemandeAnnulationCartePlafondComponent', () => {
  let component: HistoriqueDemandeAnnulationCartePlafondComponent;
  let fixture: ComponentFixture<HistoriqueDemandeAnnulationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueDemandeAnnulationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueDemandeAnnulationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
