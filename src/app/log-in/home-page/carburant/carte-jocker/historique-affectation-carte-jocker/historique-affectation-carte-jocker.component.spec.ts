import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistoriqueAffectationCarteJockerComponent} from './historique-affectation-carte-jocker.component';

describe('HistoriqueAffectationCarteJockerComponent', () => {
  let component: HistoriqueAffectationCarteJockerComponent;
  let fixture: ComponentFixture<HistoriqueAffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueAffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueAffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
