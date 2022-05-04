import {TestBed} from '@angular/core/testing';

import {CarburantServiceService} from './carburant-service.service';

describe('CarburantServiceService', () => {
  let service: CarburantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarburantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
