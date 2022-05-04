import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoriqueAffectationCartePlafondComponent} from './historique-affectation-carte-plafond.component';

describe('HistoriqueAffectationCartePlafondComponent', () => {
  let component: HistoriqueAffectationCartePlafondComponent;
  let fixture: ComponentFixture<HistoriqueAffectationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueAffectationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueAffectationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
