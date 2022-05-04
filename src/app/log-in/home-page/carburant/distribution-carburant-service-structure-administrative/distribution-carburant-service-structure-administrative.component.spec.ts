import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DistributionCarburantServiceStructureAdministrativeComponent} from './distribution-carburant-service-structure-administrative.component';

describe('DistributionCarburantServiceStructureAdministrativeComponent', () => {
  let component: DistributionCarburantServiceStructureAdministrativeComponent;
  let fixture: ComponentFixture<DistributionCarburantServiceStructureAdministrativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionCarburantServiceStructureAdministrativeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionCarburantServiceStructureAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
