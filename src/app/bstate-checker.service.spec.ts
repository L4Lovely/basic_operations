import { TestBed } from '@angular/core/testing';

import { BStateCheckerService } from './bstate-checker.service';

describe('BStateCheckerService', () => {
  let service: BStateCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BStateCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
