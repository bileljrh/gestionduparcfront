import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDemandeAffectationCarteJockerComponent } from './confirm-demande-affectation-carte-jocker.component';

describe('ConfirmDemandeAffectationCarteJockerComponent', () => {
  let component: ConfirmDemandeAffectationCarteJockerComponent;
  let fixture: ComponentFixture<ConfirmDemandeAffectationCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDemandeAffectationCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDemandeAffectationCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
