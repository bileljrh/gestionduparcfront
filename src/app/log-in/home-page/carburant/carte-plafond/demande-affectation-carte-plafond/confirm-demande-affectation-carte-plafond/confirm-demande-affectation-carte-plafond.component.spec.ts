import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmDemandeAffectationCartePlafondComponent} from './confirm-demande-affectation-carte-plafond.component';

describe('ConfirmDemandeAffectationCartePlafondComponent', () => {
  let component: ConfirmDemandeAffectationCartePlafondComponent;
  let fixture: ComponentFixture<ConfirmDemandeAffectationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDemandeAffectationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDemandeAffectationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
