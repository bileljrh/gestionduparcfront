import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemandeAffectationCartePlafondComponent} from './demande-affectation-carte-plafond.component';

describe('DemandeAffectationCartePlafondComponent', () => {
  let component: DemandeAffectationCartePlafondComponent;
  let fixture: ComponentFixture<DemandeAffectationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeAffectationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeAffectationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
