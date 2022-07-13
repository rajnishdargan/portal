import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionService } from '../action/action.service';
import { map } from 'rxjs/operators';
import * as _ from 'lodash-es';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public _userProfile: any;
  constructor(private actionService: ActionService) { }

  setUserProfile(profileData) {
    this._userProfile = profileData;
  }

  public get userProfile() {
    return _.cloneDeep(this._userProfile);
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
