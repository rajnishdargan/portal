import { TestBed } from '@angular/core/testing';

import { QuestionCursorImplementationService } from './question-cursor-implementation.service';

describe('QuestionCursorImplementationService', () => {
  let service: QuestionCursorImplementationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionCursorImplementationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
