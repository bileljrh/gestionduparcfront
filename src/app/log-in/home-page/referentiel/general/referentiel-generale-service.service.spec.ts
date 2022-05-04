import {TestBed} from '@angular/core/testing';

import {ReferentielGeneraleServiceService} from './referentiel-generale-service.service';

describe('ReferentielGeneraleServiceService', () => {
  let service: ReferentielGeneraleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferentielGeneraleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
