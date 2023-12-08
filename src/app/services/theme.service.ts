import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalService } from './local.service';
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

  getById(id: string, user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}id?id=${id}&user_id=${user_id}`);
  }

}
