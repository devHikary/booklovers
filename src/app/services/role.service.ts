import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Permission } from '../models/Permission';
import { Role } from '../models/Role';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private controllerName = "roles/";
  constructor(
    private http: HttpClient,
  ) { }

  public add(r: Role) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, r);
  }

  public update(r: Role) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.put(request, r);
  }

  getAll(){
    return this.http.get(`${urlAPI}${this.controllerName}`);
  }

  getById(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${urlAPI}${this.controllerName}${id}`);
  }
}
