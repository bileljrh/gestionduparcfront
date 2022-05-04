import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ValidateDemandeAffectationCartePlafondComponent} from './validate-demande-affectation-carte-plafond.component';

describe('ValidateDemandeAffectationCartePlafondComponent', () => {
  let component: ValidateDemandeAffectationCartePlafondComponent;
  let fixture: ComponentFixture<ValidateDemandeAffectationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateDemandeAffectationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateDemandeAffectationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
