import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionAffectationCarteJockerComponent} from './gestion-affectation-carte-jocker.component';

describe('GestionAffectationCarteJockerComponent', () => {
  let component: GestionAffectationCarteJockerComponent;
  let fixture: ComponentFixture<GestionAffectationCarteJockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GestionAffectationCarteJockerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
