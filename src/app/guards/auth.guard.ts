import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "@app/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const currentAccessToken = this.authService.currentUserValue;
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;
    let expectedRole;
    if (currentAccessToken && expectedRoleArray.length > 0) {
      let i;
      for (i = 0; i < expectedRoleArray.length; i++) {
        if (expectedRoleArray[i] === currentAccessToken.role) {
          expectedRole = currentAccessToken.role;
        }
      }
      if (this.authService.isAuthenticated() && expectedRole) {
        return true;
      }
    } else {
      this.router.navigate(['/home'], {
        queryParams: { returnUrl: state.url },
      });
    }
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return true;
  }

}
