import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Goal } from '../models/Goal';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private controllerName = "goals/";
  constructor(
    private http: HttpClient,
  ) { }

  getAll(user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}u/${user_id}`);
  }

  getById(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}${id}`);
  }

  getAndamento(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}s/andamento/${id}`);
  }

  public add(g: Goal) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, g);
  }

  public update(g: Goal) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.put(request, g);
  }

  delete(id: string) {
    return this.http.delete(`${urlAPI}${this.controllerName}${id}`);
  }
}
