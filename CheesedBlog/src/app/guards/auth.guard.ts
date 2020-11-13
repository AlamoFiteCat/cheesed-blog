import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      return this.http
        .get(`${environment.apiUrl}/users/current`, {
          withCredentials: true,
        })
        .subscribe(
          (user: { currentEmail: string; currentUsername: string }) => {
            if (user.currentEmail) {
              resolve(true);
            } else {
              resolve(false);
              this.router.navigate(['posts']);
            }
          }
        );
    });
  }
}
