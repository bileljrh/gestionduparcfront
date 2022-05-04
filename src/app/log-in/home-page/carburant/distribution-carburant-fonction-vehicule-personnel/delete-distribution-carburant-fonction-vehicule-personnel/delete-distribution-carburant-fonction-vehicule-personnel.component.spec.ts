import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDistributionCarburantFonctionVehiculePersonnelComponent} from './delete-distribution-carburant-fonction-vehicule-personnel.component';

describe('DeleteDistributionCarburantFonctionVehiculePersonnelComponent', () => {
  let component: DeleteDistributionCarburantFonctionVehiculePersonnelComponent;
  let fixture: ComponentFixture<DeleteDistributionCarburantFonctionVehiculePersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDistributionCarburantFonctionVehiculePersonnelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDistributionCarburantFonctionVehiculePersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
