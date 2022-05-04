import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemandeAnnulationCartePlafondComponent} from './demande-annulation-carte-plafond.component';

describe('DemandeAnnulationCartePlafondComponent', () => {
  let component: DemandeAnnulationCartePlafondComponent;
  let fixture: ComponentFixture<DemandeAnnulationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeAnnulationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeAnnulationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
