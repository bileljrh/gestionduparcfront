import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlusInfoDemandeAnnulationCartePlafondComponent} from './plus-info-demande-annulation-carte-plafond.component';

describe('PlusInfoDemandeAnnulationCartePlafondComponent', () => {
  let component: PlusInfoDemandeAnnulationCartePlafondComponent;
  let fixture: ComponentFixture<PlusInfoDemandeAnnulationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlusInfoDemandeAnnulationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusInfoDemandeAnnulationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
