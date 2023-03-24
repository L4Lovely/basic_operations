import { TestBed } from '@angular/core/testing';

import { QuestioneerService } from './questioneer.service';

describe('QuestioneerService', () => {
  let service: QuestioneerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestioneerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
