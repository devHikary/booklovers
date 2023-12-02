import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private controllerName = "themes/";
  constructor(
    private http: HttpClient,
  ) { }

  getAll(){
    return this.http.get(`${urlAPI}${this.controllerName}`);
  }

  getById(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}${id}`);
  }

}
