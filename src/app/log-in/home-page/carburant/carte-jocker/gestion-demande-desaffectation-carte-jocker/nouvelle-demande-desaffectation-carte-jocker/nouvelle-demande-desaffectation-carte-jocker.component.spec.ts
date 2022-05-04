import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouvelleDemandeDesaffectationCarteJockerComponent} from './nouvelle-demande-desaffectation-carte-jocker.component';

describe('NouvelleDemandeDesaffectationCarteJockerComponent', () => {
  let component: NouvelleDemandeDesaffectationCarteJockerComponent;
  let fixture: ComponentFixture<NouvelleDemandeDesaffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleDemandeDesaffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleDemandeDesaffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
