import {TestBed} from '@angular/core/testing';

import {OrdreMissionServiceService} from './ordre-mission-service.service';

describe('OrdreMissionServiceService', () => {
  let service: OrdreMissionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdreMissionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
