import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private controllerName = "statistic/";

  constructor(
    private http: HttpClient,
  ) { }

  getMonth(user_id: string){
    return this.http.get(`${urlAPI}${this.controllerName}month/${user_id}`);
  }
  getYear(user_id: string){
    return this.http.get(`${urlAPI}${this.controllerName}year/${user_id}`);
  }

  getRating(rating: string, user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}rating?r=${rating}&u=${user_id}`);
  }

  getTheme(user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}theme?user_id=${user_id}`);
  }

  getFavorite(user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}favorite?u=${user_id}`);
  }
}
