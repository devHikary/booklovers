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

  getById(id: string, user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}${id}/u/${user_id}`);
  }

}
