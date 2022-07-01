import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import * as _ from 'lodash-es';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-questionset-up-for-review',
  templateUrl: './questionset-up-for-review.component.html',
  styleUrls: ['./questionset-up-for-review.component.scss']
})
export class QuestionsetUpForReviewComponent implements OnInit {
  questionsetList: any;
  constructor(
    public router: Router,
    public helperService: HelperService) { }

  ngOnInit(): void {
    this.getUpForReviewQuestionsets();
  }

  navigateToQuestionset(id): void {
    this.router.navigate(['/edit/questionset/', id, 'Review']);
  }

  getUpForReviewQuestionsets(): void {
    const req = {
      request: {
        filters: {
          status: [
            'Review'
          ],
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
