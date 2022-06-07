import { DataService } from './../data/data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/**
 * Service to provides CRUD methods to make action api request by extending DataService.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class ActionService extends DataService {
  /**
   * base Url for action api
   */
  baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = '/action/';
  }
}
