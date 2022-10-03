import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import { UserService } from 'src/app/services/user/user.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { IPagination } from 'src/app/interfaces/pagination';
import { combineLatest as observableCombineLatest, forkJoin, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import * as _ from 'lodash-es';
@Component({
  selector: 'app-questionset-list',
  templateUrl: './questionset-list.component.html',
  styleUrls: ['./questionset-list.component.scss']
})
export class QuestionsetListComponent implements OnInit {
  questionsetList: any;
  userRole: string;
  totalCount: Number;
  pager: IPagination;
  pageNumber = 1;
  queryParams: any;
  query: any;
  public PAGE_LIMIT = 7;
  showLoader = true;
  constructor(
    private router: Router,
    public helperService: HelperService,
    public userService: UserService,
    public paginationService: PaginationService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    observableCombineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams]).pipe(
        map(([params, queryParams]) => ({ params, queryParams })
      ))
      .subscribe(bothParams => {
        console.log('bothParams', bothParams);
        if (bothParams.params.pageNumber) {
          this.pageNumber = Number(bothParams.params.pageNumber);
        }
        this.queryParams = bothParams.queryParams;
        this.query = this.queryParams['query'];
        this.getAllQuestionsetList(this.PAGE_LIMIT, this.pageNumber, bothParams);
      });
  }

  navigatetoHome(): void {
    this.router.navigate(['/']);
  }

  getAllQuestionsetList(limit, pageNumber, bothParams): void {
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
        limit: limit,
        offset: (pageNumber - 1) * (limit),
        query: this.query,
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
        this.showLoader = false;
        this.totalCount = response.result.count;
        this.pager = this.paginationService.getPager(response.result.count, pageNumber, limit);
      }, (error) => {
        this.showLoader = false;
        console.log(error);
      });
  }

  navigateToQuestionset(id, status): void {
    this.router.navigate(['/edit/questionset/', id, status]);
  }

  navigateToPage(page: number): undefined | void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pageNumber = page;
    this.router.navigate(['questionset/questionset-list', this.pageNumber], { queryParams: this.queryParams });
  }

}
