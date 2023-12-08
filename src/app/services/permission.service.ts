import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Permission } from '../models/Permission';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private controllerName = "permissions/";
  constructor(
    private http: HttpClient,
  ) { }

  public add(p: Permission) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, p);
  }

  public update(p: Permission) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.put(request, p);
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
