import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private headerService: HeaderService,
    private localService: LocalService,
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuthenticated = localStorage.getItem('token') != null;
    this.headerService.updateToggle(true);
    this.headerService.updateUser(this.localService.getUsername());

    //TODO: verificar se o token está válido
    if (!isAuthenticated) {
      this.headerService.updateToggle(false);
      this.router.navigate(['/booklovers/login']);
    }

    return isAuthenticated;
  }

}
