import { TestBed } from '@angular/core/testing';

import { DemandeQuotaCarteJockerService } from './demande-quota-carte-jocker.service';

describe('DemandeQuotaCarteJockerService', () => {
  let service: DemandeQuotaCarteJockerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeQuotaCarteJockerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
