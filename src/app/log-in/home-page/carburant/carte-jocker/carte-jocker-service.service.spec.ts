import {TestBed} from '@angular/core/testing';

import {CarteJockerServiceService} from './carte-jocker-service.service';

describe('CarteJockerServiceService', () => {
  let service: CarteJockerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarteJockerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
