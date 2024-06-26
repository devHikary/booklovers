import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Login } from '../models/Login';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private controllerName = 'login/';
  constructor(private http: HttpClient) {}

  public auth(l: Login) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, l);
  }
}
