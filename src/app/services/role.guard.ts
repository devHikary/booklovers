import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private localservice: LocalService,
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userRoles = JSON.parse(this.localservice.getData('bS'));
    console.log(userRoles)
    let isAuthorized = false;
    userRoles.forEach((role: any) => {
      console.log(next.routeConfig?.path)
      console.log(next.routeConfig?.path?.includes(role.url))
      if (next.routeConfig?.path?.includes(role.url)) {
        isAuthorized = true;
        // if ((next.routeConfig?.path?.includes("edit") && role.readOnly == true)) isAuthorized = false;
      }
    })
    if (!isAuthorized) {
      this.router.navigate(['/booklovers/error']);
    }
    return isAuthorized;
  }

}
