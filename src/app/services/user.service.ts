import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Password } from '../models/Password';
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

  getById(id: string){
    return this.http.get(`${urlAPI}${this.controllerName}${id}`);
  }

  public add(u: User) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, u);
  }

  public update(u: User) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.put(request, u);
  }

  public updatePass(p: Password) {
    let request = `${urlAPI}${this.controllerName}updatePwd`;
    return this.http.put(request, p);
  }

  delete(id: string) {
    return this.http.delete(`${urlAPI}${this.controllerName}${id}`);
  }
}
