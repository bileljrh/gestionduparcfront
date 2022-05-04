import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyDistributionCarburantFonctionVehiculePersonnelComponent} from './modify-distribution-carburant-fonction-vehicule-personnel.component';

describe('ModifyDistributionCarburantFonctionVehiculePersonnelComponent', () => {
  let component: ModifyDistributionCarburantFonctionVehiculePersonnelComponent;
  let fixture: ComponentFixture<ModifyDistributionCarburantFonctionVehiculePersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDistributionCarburantFonctionVehiculePersonnelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDistributionCarburantFonctionVehiculePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
