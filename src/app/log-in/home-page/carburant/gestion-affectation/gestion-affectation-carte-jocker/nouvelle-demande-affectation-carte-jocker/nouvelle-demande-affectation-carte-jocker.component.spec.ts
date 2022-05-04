import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleDemandeAffectationCarteJockerComponent} from './nouvelle-demande-affectation-carte-jocker.component';

describe('NouvelleDemandeAffectationCarteJockerComponent', () => {
  let component: NouvelleDemandeAffectationCarteJockerComponent;
  let fixture: ComponentFixture<NouvelleDemandeAffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleDemandeAffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleDemandeAffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
