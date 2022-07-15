import { TestBed } from '@angular/core/testing';
import { QuestionCursorImplementationService } from './question-cursor-implementation.service';
import { ContentService } from './content.service';
import { HttpClientModule } from '@angular/common/http';
describe('QuestionCursorImplementationService', () => {
  let service: QuestionCursorImplementationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ContentService]
    });
    service = TestBed.get(QuestionCursorImplementationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
