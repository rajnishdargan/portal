import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import * as _ from 'lodash-es';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    userRole;
    constructor(private router: Router) {
    }

    canLoad(): boolean {
        this.userRole = JSON.parse(localStorage.getItem('userRole'));
        if (this.userRole) {
            return true;
        } else {
            return false;
        }
    }
    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): Observable<boolean> {
        return this.getPermission(activatedRouteSnapshot.data.roles);
    }

    // tslint:disable-next-line:typedef
    getPermission(roles) {
        this.userRole = JSON.parse(localStorage.getItem('userRole'));
        return Observable.create(observer => {
            if (roles === this.userRole) {
                observer.next(true);
            } else {
                this.navigateToHome(observer);
            }
        });
    }

    // tslint:disable-next-line:typedef
    navigateToHome(observer) {
        this.router.navigate(['/questionset']);
        observer.next(false);
        observer.complete();
    }

}
