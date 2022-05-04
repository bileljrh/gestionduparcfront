import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateDemandeAffectationCarteJockerComponent } from './validate-demande-affectation-carte-jocker.component';

describe('ValidateDemandeAffectationCarteJockerComponent', () => {
  let component: ValidateDemandeAffectationCarteJockerComponent;
  let fixture: ComponentFixture<ValidateDemandeAffectationCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateDemandeAffectationCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateDemandeAffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
