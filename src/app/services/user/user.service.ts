import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionService } from '../action/action.service';
import { map } from 'rxjs/operators';
import * as _ from 'lodash-es';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private actionService: ActionService) { }

  setUserProfile(profileData) {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
  }

  public get userProfile() {
    return JSON.parse(localStorage.getItem('userProfile'));
  }

  getAllUsersByRoleType(role): Observable<any> {
    const req = {
      url: 'users',
      data: {
        roleType: role
      }
    };
    return this.actionService.post(req).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
