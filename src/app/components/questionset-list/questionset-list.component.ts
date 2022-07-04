import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-questionset-list',
  templateUrl: './questionset-list.component.html',
  styleUrls: ['./questionset-list.component.scss']
})
export class QuestionsetListComponent implements OnInit {
  questionsetList: any;
  userRole: string;
  constructor(
    private router: Router,
    public helperService: HelperService) { }

  ngOnInit(): void {
    this.getAllQuestionsetList();
  }

  navigatetoHome(): void {
    this.router.navigate(['/']);
  }

  getAllQuestionsetList(): void {
    const creatorStatus = [
      'Draft',
      'FlagDraft',
      'Review',
      'flagged',
      'Live',
      'Unlisted',
      'FlagReview'
    ];
    const reviewerStatus = ['Review', 'FlagReview'];
    let QuestionSetStatus = [];
    if (localStorage.getItem('userRole')) {
      this.userRole = JSON.parse(localStorage.getItem('userRole'));
    }
    if (this.userRole === 'creator') {
      QuestionSetStatus = creatorStatus;
    }
    if (this.userRole === 'reviewer'){
      QuestionSetStatus = reviewerStatus;
    }
    const req = {
      request: {
        filters: {
          status: QuestionSetStatus,
          objectType: 'Questionset',
          channel: '01309282781705830427',
          createdBy: '5a587cc1-e018-4859-a0a8-e842650b9d64'
        },
        offset: 0,
        limit: 200,
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

  navigateToQuestionset(id, status): void {
    this.router.navigate(['/edit/questionset/', id, status]);
  }

}
