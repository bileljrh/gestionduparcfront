import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnulerDemandeMaintenanceComponent } from './annuler-demande-maintenance.component';

describe('AnnulerDemandeMaintenanceComponent', () => {
  let component: AnnulerDemandeMaintenanceComponent;
  let fixture: ComponentFixture<AnnulerDemandeMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnulerDemandeMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnulerDemandeMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
