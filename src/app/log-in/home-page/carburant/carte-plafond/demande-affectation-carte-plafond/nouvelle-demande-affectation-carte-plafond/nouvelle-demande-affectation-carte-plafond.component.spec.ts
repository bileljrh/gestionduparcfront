import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleDemandeAffectationCartePlafondComponent} from './nouvelle-demande-affectation-carte-plafond.component';

describe('NouvelleDemandeAffectationCartePlafondComponent', () => {
  let component: NouvelleDemandeAffectationCartePlafondComponent;
  let fixture: ComponentFixture<NouvelleDemandeAffectationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleDemandeAffectationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleDemandeAffectationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
