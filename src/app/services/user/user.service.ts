import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionService } from '../action/action.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private actionService: ActionService
  ) { }

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
