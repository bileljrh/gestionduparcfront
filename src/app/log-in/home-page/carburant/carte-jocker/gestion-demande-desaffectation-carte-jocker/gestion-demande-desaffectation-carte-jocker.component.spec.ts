import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionDemandeDesaffectationCarteJockerComponent} from './gestion-demande-desaffectation-carte-jocker.component';

describe('GestionDemandeDesaffectationCarteJockerComponent', () => {
  let component: GestionDemandeDesaffectationCarteJockerComponent;
  let fixture: ComponentFixture<GestionDemandeDesaffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDemandeDesaffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDemandeDesaffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
