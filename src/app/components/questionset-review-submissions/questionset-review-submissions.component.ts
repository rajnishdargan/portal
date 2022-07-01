import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import * as _ from 'lodash-es';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-questionset-review-submissions',
  templateUrl: './questionset-review-submissions.component.html',
  styleUrls: ['./questionset-review-submissions.component.scss']
})
export class QuestionsetReviewSubmissionsComponent implements OnInit {
  questionsetList: any;
  constructor(
    public router: Router,
    public helperService: HelperService) { }

  ngOnInit(): void {
    this.getReviewQuestionsets();
  }

  navigateToQuestionset(id): void {
    this.router.navigate(['/edit/questionset/', id, 'ReviewSubmitted']);
  }

  getReviewQuestionsets(): void {
    const req = {
      request: {
        filters: {
          status: ['Review'],
          objectType: 'Questionset',
          createdBy: environment.userDetails.id
        },
        offset: 0,
        limit: 100,
        query: '',
        sort_by: {
          lastUpdatedOn: 'desc'
        }
      }
    };
    this.helperService.getQuestionsetList(req)
      .subscribe((response) => {
        this.questionsetList = _.get(response, 'result.QuestionSet');
      }, (error) => {
        console.log(error);
      });
  }

}
