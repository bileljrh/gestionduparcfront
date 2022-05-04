import {TestBed} from '@angular/core/testing';

import {CarteAgilisCashServiceService} from './carte-agilis-cash-service.service';

describe('CarteAgilisCashServiceService', () => {
  let service: CarteAgilisCashServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarteAgilisCashServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
