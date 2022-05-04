import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DistributionCarburantFonctionVehiculePersonnelComponent} from './distribution-carburant-fonction-vehicule-personnel.component';

describe('DistributionCarburantFonctionVehiculePersonnelComponent', () => {
  let component: DistributionCarburantFonctionVehiculePersonnelComponent;
  let fixture: ComponentFixture<DistributionCarburantFonctionVehiculePersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionCarburantFonctionVehiculePersonnelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionCarburantFonctionVehiculePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
