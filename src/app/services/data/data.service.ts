
import { of as observableOf, throwError as observableThrowError, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash-es';

/**
 * Service to provide base CRUD methods to make api request.
 *
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string;
  /**
   * angular HttpClient
   */
  http: HttpClient;
  /**
   * Constructor
   * @param "HttpClient" http HttpClient reference
   */
  appVersion: string;
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * For making get api calls which needs headers in response
   * @param requestParam interface
   */
  getWithHeaders(requestParam: any): Observable<any> {
    const httpOptions: any = {
      headers: requestParam.header,
      params: requestParam.param,
      observe: 'response'
    };
    return this.http.get(this.baseUrl + requestParam.url, httpOptions).pipe(
      mergeMap(({ body }: any) => {
        if (body.responseCode !== 'OK') {
          return observableThrowError(body);
        }
        return observableOf(body);
      }));
  }

  /**
   * For making get api calls
   * @param requestParam interface
   */
  get(requestParam: any): Observable<any> {
    const httpOptions: any = {
      headers: requestParam.header,
      params: requestParam.param
    };
    return this.http.get(this.baseUrl + requestParam.url, httpOptions).pipe(
      mergeMap((data: any) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }

  /**
   * for making post api calls with headers in response object
   */
  postWithHeaders(requestParam: any): Observable<any> {
    const httpOptions: any = {
      headers: requestParam.header,
      params: requestParam.param,
      observe: 'response'
    };
    return this.http.post(this.baseUrl + requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap(({ body }: any) => {
        if (body.responseCode !== 'OK') {
          return observableThrowError(body);
        }
        return observableOf(body);
      }));
  }

  /**
   * for making post api calls
   */
  post(requestParam: any): Observable<any> {
    const httpOptions: any = {
      headers: requestParam.header,
      params: requestParam.param
    };
    return this.http.post(this.baseUrl + requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: any) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }

  /**
   * For making patch api calls
   */
  patch(requestParam: any): Observable<any> {
    const httpOptions: any = {
      headers: requestParam.header,
      params: requestParam.param
    };
    return this.http.patch(this.baseUrl + requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: any) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }

  /**
   * For making delete api calls
   */
  delete(requestParam: any): Observable<any> {
    const httpOptions: any = {
      headers: requestParam.header,
      params: requestParam.param,
      body: requestParam.data
    };
    return this.http.delete(this.baseUrl + requestParam.url, httpOptions).pipe(
      mergeMap((data: any) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }

  /**
   * For making PUT api calls
   */
  put(requestParam: any): Observable<any> {
    const httpOptions: any = {
      headers: requestParam.header,
      params: requestParam.param,
    };
    return this.http.put(this.baseUrl + requestParam.url, requestParam.data, httpOptions).pipe(
      mergeMap((data: any) => {
        if (data.responseCode !== 'OK') {
          return observableThrowError(data);
        }
        return observableOf(data);
      }));
  }
}
