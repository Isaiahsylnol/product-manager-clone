import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (userIsAuthenticated()) {
      return true; // Allow access to the route
    } else {
      return this.router.createUrlTree(['/login']); // Redirect to the login page
    }
  }
}

function userIsAuthenticated() {
  if (localStorage.getItem('userData')) {
    return true;
  } else {
    return false;
  }
}
