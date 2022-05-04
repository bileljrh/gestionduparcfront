import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DistributionCarburantServiceQuotaComplementaireComponent} from './distribution-carburant-service-quota-complementaire.component';

describe('DistributionCarburantServiceQuotaComplementaireComponent', () => {
  let component: DistributionCarburantServiceQuotaComplementaireComponent;
  let fixture: ComponentFixture<DistributionCarburantServiceQuotaComplementaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionCarburantServiceQuotaComplementaireComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionCarburantServiceQuotaComplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
