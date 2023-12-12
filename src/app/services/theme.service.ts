import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalService } from './local.service';
import { Theme } from '../models/Theme';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private controllerName = "themes/";

  constructor(
    private http: HttpClient,
    private localService: LocalService,
  ) { }

  getAll(){
    return this.http.get(`${urlAPI}${this.controllerName}`);
  }

  getByIdUser(id: string, user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}u?id=${id}&user_id=${user_id}`);
  }

  getById(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}${id}`);
  }

  public add(t: Theme) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, t);
  }

  public update(t: Theme) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.put(request, t);
  }

  public delete(id: string){
    return this.http.delete(`${urlAPI}${this.controllerName}${id}`);
  }
}
