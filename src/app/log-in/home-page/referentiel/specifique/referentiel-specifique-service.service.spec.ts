import {TestBed} from '@angular/core/testing';

import {ReferentielSpecifiqueServiceService} from './referentiel-specifique-service.service';

describe('ReferentielSpecifiqueServiceService', () => {
  let service: ReferentielSpecifiqueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferentielSpecifiqueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
