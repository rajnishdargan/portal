import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash-es';
import { Subject, of} from 'rxjs';
import { debounceTime, distinctUntilChanged, delay, flatMap } from 'rxjs/operators';
@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit {
  route: Router;
  private activatedRoute: ActivatedRoute;
  query: string;
  public redirectUrl = 'questionset/questionset-list/1';
  queryParams: any;
  modelChanged: Subject<string> = new Subject<string>();


  constructor(
    activatedRoute: ActivatedRoute,
    route: Router) {
    this.route = route;
    this.activatedRoute = activatedRoute;
    this.route.onSameUrlNavigation = 'reload';
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.queryParams = { ...params };
        this.query = this.queryParams['query'];
        _.forIn(params, (value, key) => {
          if (typeof value === 'string' && key !== 'query') {
            this.queryParams[key] = [value];
          }
        });
      });
      this.modelChanged.pipe(debounceTime(1000),
      distinctUntilChanged(),
      flatMap(search => of(search).pipe(delay(500)))
      ).
      subscribe(query => {
        this.query = query;
        this.handleSearch();
      });
  }

  public handleSearch() {
    if (!_.isEmpty(this.query)) {
      this.queryParams['query'] = this.query;
    } else {
      delete this.queryParams['query'];
    }
    this.route.navigate([this.redirectUrl], { queryParams: this.queryParams});
  }

  keyup(event) {
    this.query = event;
    this.modelChanged.next(this.query);
    // this.handleSearch();
  }
}
