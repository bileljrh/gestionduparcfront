import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlusInfoHistoriqueAffectationCartePlafondComponent} from './plus-info-historique-affectation-carte-plafond.component';

describe('PlusInfoHistoriqueAffectationCartePlafondComponent', () => {
  let component: PlusInfoHistoriqueAffectationCartePlafondComponent;
  let fixture: ComponentFixture<PlusInfoHistoriqueAffectationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlusInfoHistoriqueAffectationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusInfoHistoriqueAffectationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
