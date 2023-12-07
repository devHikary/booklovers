import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Annotation } from '../models/Annotation';
import { List } from '../models/List';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private controllerName = "lists/";
  constructor(
    private http: HttpClient,
  ) { }

  getAll(user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}myl/${user_id}`);
  }

  getAllBooks(user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}myb/${user_id}`);
  }

  getById(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}${id}`);
  }

  public add(l: List) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, l);
  }

  public update(l: List) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.put(request, l);
  }

  public addBook(l: any) {
    let request = `${urlAPI}${this.controllerName}book/`;
    return this.http.post(request, l);
  }

  public delete(id: string){
    return this.http.delete(`${urlAPI}${this.controllerName}${id}`);
  }
}
