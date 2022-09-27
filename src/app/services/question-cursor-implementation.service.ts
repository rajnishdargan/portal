import { Injectable } from '@angular/core';
import { QuestionCursor } from '@project-sunbird/sunbird-quml-player';
import { Question } from '@project-sunbird/sunbird-quml-player/lib/quml-library-interface';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiEndPoints } from '../app.constant';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionCursorImplementationService implements QuestionCursor {

  baseUrl: string = environment.baseUrl;
  constructor(private contentService: ContentService) { }

  getQuestions(identifiers: string[], parentId?: string): Observable<Question> {
    const option: any = {
      url: `${ApiEndPoints.questionList}`,
      data: {
        request: {
          search: { identifier: identifiers }
        }
      }
    };
    return this.contentService.post(option).pipe(map((data) => {
      return data.result;
    }));
  }

  getQuestion(identifier: string): Observable<Question> {
    const option: any = {
      url: `${ApiEndPoints.questionList}`,
      data: {
        request: {
          search: { identifier: [identifier] }
        }
      }
    };
    return this.contentService.post(option).pipe(map((data: any) => data.result));
  };

  getQuestionSet(identifier: string): Observable<any> {
    const hierarchy = this.contentService.get(`${ApiEndPoints.getQuestionSetHierarchy}${identifier}`);
    const questionSetResponse = this.contentService.get(`${ApiEndPoints.questionSetRead}${identifier}?fields=instructions`);
    return (
      forkJoin([hierarchy, questionSetResponse]).pipe(map((res: any) => {
        const questionSet = res[0]?.result.questionSet;
        const instructions = res[1].result.questionset.instructions;
        if (instructions && questionSet) {
          questionSet.instructions = instructions;
        }
        return questionSet;
      })
      ));
  };

  getAllQuestionSet(identifiers: string[]): Observable<any> {
    return of();
  };

}
