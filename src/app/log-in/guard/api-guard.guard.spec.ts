import { TestBed } from '@angular/core/testing';

import { ApiGuardGuard } from './api-guard.guard';

describe('ApiGuardGuard', () => {
  let guard: ApiGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ApiGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
