import {TestBed} from '@angular/core/testing';

import {MaintenanceAndReparationServiceService} from './maintenance-and-reparation-service.service';

describe('MaintenanceAndReparationServiceService', () => {
  let service: MaintenanceAndReparationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceAndReparationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
