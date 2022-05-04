import {TestBed} from '@angular/core/testing';
import {AdministratifServiceService} from './administratif-service.service';

describe('AdministratifServiceService', () => {
  let service: AdministratifServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministratifServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
