import { TestBed } from '@angular/core/testing';

import { QEmitterService } from './qemitter.service';

describe('QEmitterService', () => {
  let service: QEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
