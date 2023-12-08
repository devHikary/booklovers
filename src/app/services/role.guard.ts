import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private localservice: LocalService,
    private headerService: HeaderService,
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userRoles = JSON.parse(this.localservice.getData('bS'));
    this.headerService.updateAdm(userRoles.some(p => p.name === "Gerenciamento"))
    let isAuthorized = false;
    userRoles.forEach((role: any) => {
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
