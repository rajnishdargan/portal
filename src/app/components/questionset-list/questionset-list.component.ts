import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service';
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
    public helperService: HelperService,
    public userService: UserService) { }

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
    if (this.userService.userProfile) {
      this.userRole = this.userService.userProfile.role;
    }
    if (this.userRole === 'creator') {
      QuestionSetStatus = creatorStatus;
    }
    if (this.userRole === 'reviewer') {
      QuestionSetStatus = reviewerStatus;
    }
    const req = {
      request: {
        filters: {
          status: QuestionSetStatus,
          objectType: 'Questionset',
          channel: this.userService.userProfile.channelId
        },
        offset: 0,
        limit: 200,
        query: '',
        sort_by: {
          lastUpdatedOn: 'desc'
        }
      }
    };
    if (_.get(this.userService.userProfile, 'role') === 'creator') {
      req.request.filters = { ...req.request.filters, ...{ createdBy: this.userService.userProfile.id } };
    } else if (_.get(this.userService.userProfile, 'role') === 'reviewer') {
      req.request.filters = { ...req.request.filters, ...{ createdBy: { '!=': this.userService.userProfile.id } } };
    }
    this.helperService.getQuestionsetList(req)
      .subscribe((response) => {
        this.questionsetList = _.get(response, 'result.QuestionSet');
      }, (error) => {
        console.log(error);
      });
  }

  navigateToQuestionset(id, status): void {
    this.router.navigate(['/edit/questionset/', id, status]);
  }

}
