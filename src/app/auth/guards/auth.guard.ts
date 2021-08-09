import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.verifyAuth().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.verifyAuth().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['./auth/login']);
        }
      })
    );
  }
}
