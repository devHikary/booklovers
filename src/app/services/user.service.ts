import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private controllerName = "users/";
  constructor(
    private http: HttpClient,
  ) { }

  getAll(){
    return this.http.get(`${urlAPI}${this.controllerName}`);
  }

  public add(u: User) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, u);
  }
}
