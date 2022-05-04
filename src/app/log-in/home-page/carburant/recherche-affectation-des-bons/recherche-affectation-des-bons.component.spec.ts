import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RechercheAffectationDesBonsComponent} from './recherche-affectation-des-bons.component';

describe('RechercheAffectationDesBonsComponent', () => {
  let component: RechercheAffectationDesBonsComponent;
  let fixture: ComponentFixture<RechercheAffectationDesBonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RechercheAffectationDesBonsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheAffectationDesBonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
