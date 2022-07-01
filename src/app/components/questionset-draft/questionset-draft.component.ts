import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import * as _ from 'lodash-es';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-questionset-draft',
  templateUrl: './questionset-draft.component.html',
  styleUrls: ['./questionset-draft.component.scss']
})
export class QuestionsetDraftComponent implements OnInit {
  questionsetList: any;
  constructor(
    public router: Router,
    public helperService: HelperService) { }

  ngOnInit(): void {
    this.getDraftQuestionsets();
  }

  navigateToQuestionset(id): void {
    this.router.navigate(['/edit/questionset/', id, 'Draft']);
  }

  getDraftQuestionsets(): void {
    const req = {
      request: {
        filters: {
          status: [
            'Draft'
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
        console.log('questionsetList', this.questionsetList);
      }, (error) => {
        console.log(error);
      });
  }

}
