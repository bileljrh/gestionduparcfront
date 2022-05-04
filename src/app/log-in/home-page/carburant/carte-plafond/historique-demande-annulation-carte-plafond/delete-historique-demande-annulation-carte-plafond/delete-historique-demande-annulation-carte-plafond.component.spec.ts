import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteHistoriqueDemandeAnnulationCartePlafondComponent} from './delete-historique-demande-annulation-carte-plafond.component';

describe('DeleteHistoriqueDemandeAnnulationCartePlafondComponent', () => {
  let component: DeleteHistoriqueDemandeAnnulationCartePlafondComponent;
  let fixture: ComponentFixture<DeleteHistoriqueDemandeAnnulationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteHistoriqueDemandeAnnulationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHistoriqueDemandeAnnulationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
