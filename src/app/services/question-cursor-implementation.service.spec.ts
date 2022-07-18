import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContentService } from './content.service';

import { QuestionCursorImplementationService } from './question-cursor-implementation.service';
describe('QuestionCursorImplementationService', () => {
  let service: QuestionCursorImplementationService;

  class MockContentService {
    post() {
      return of({ result: { identifier: 'do_123' } });
    }
    get() {
      return of(of({ result: { questionSet: { identifier: 'do_123', instructions: 'abc' } } }));
    }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: ContentService, useClass: MockContentService }]
    });
    service = TestBed.inject(QuestionCursorImplementationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return questions', () => {
    const contentService = TestBed.inject(ContentService);
    spyOn(contentService, 'post').and.returnValue(of({ result: { identifier: 'do_123' } }));
    const questions = service.getQuestions(['do_123']);
    expect(contentService.post).toHaveBeenCalled();
    expect(questions).toBeDefined();
  });

  it('should return single question', () => {
    const contentService = TestBed.inject(ContentService);
    spyOn(contentService, 'post').and.returnValue(of({ result: { identifier: 'do_123' } }));
    const question = service.getQuestion('do_123');
    expect(contentService.post).toHaveBeenCalled();
    expect(question).toBeDefined();
  });

  it('should return all questionset', () => {
    const questionSets = service.getAllQuestionSet(['do_123']);
    expect(questionSets).toBeDefined();
  });

  it('should return questionset', () => {
    const contentService = TestBed.inject(ContentService);
    spyOn(contentService, 'get').and.returnValue(of({ result: { questionSet: { identifier: 'do_123', instructions: 'abc' } } }));
    const questionSet = service.getQuestionSet('do_123');
    expect(contentService.get).toHaveBeenCalled();
    expect(questionSet).toBeDefined();
  });
});
