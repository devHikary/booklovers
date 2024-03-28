import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { LocalService } from './local.service';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  isLogin: boolean = false;
  constructor(
    private localService: LocalService,
    private router: Router,
    private headerService: HeaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.localService.getToken();

    if (
      token != '' &&
      !request.url.includes('/booklovers/login') &&
      !request.url.includes('https://www.googleapis')
    ) {
      this.isLogin = false;
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    } else{
      this.isLogin = true;
    }
    return next
      .handle(request)
      .pipe(catchError((x) => this.handleAuthError(x)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if ((err.status === 401 || err.status === 403) && !this.isLogin) {
      this.headerService.updateToggle(false);
      this.localService.clearStorage();
      this.router.navigateByUrl(`booklovers/login`);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return null; // or EMPTY may be appropriate here
    } else if((err.status === 503 || err.status === 500)&& !this.isLogin){
      this.router.navigateByUrl(`booklovers/errorUnavailable`);
    }
    return throwError(err);
  }
}
