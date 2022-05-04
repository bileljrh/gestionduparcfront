import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GestionDemandeInterventionComponent} from './gestion-demande-intervention.component';

describe('GestionDemandeInterventionComponent', () => {
  let component: GestionDemandeInterventionComponent;
  let fixture: ComponentFixture<GestionDemandeInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionDemandeInterventionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDemandeInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
