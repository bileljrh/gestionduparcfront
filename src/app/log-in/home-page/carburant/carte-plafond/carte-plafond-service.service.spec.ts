import {TestBed} from '@angular/core/testing';

import {CartePlafondServiceService} from './carte-plafond-service.service';

describe('CartePlafondServiceService', () => {
  let service: CartePlafondServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartePlafondServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
