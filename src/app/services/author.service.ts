import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Author } from '../models/Author';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private controllerName = "authors/";
  constructor(
    private http: HttpClient,
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

  public add(a: Author) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, a);
  }

  public update(a: Author) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.put(request, a);
  }

  public delete(id: string){
    return this.http.delete(`${urlAPI}${this.controllerName}${id}`);
  }
}
