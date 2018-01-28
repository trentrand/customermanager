import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService} from './auth.service';

import { Observable } from 'rxjs/Observable';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.auth.user.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn) {
          console.log('Access denied');
          console.log('You must be logged in!', 'error');
          this.router.navigate(['/login']);
        }
      }),
    );
  }
}
