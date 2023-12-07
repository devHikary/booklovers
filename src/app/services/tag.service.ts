import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tag } from '../models/Tag';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private controllerName = "tags/";
  constructor(
    private http: HttpClient,
  ) { }

  public add(t: Tag) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, t);
  }

  public update(t: Tag) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.put(request, t);
  }

  getAllUser(user_id: string){
    return this.http.get(`${urlAPI}${this.controllerName}user/${user_id}`);
  }

  getById(id: string, user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}${id}/u/${user_id}`);
  }

  public delete(id: string){
    return this.http.delete(`${urlAPI}${this.controllerName}${id}`);
  }
}
