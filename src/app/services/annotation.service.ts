import { Book } from 'src/app/models/Book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Annotation } from '../models/Annotation';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  private controllerName = "annotations/";
  constructor(
    private http: HttpClient,
  ) { }

  getById(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}${id}`);
  }

  public add(a: Annotation) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, a);
  }

  public update(a: Annotation) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.put(request, a);
  }

  getFinished(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}finished/${id}`);
  }

  getFavorite(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}favorite/${id}`);
  }

  getReading(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}reading/${id}`);
  }

  getAllByTheme(id: string, user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}theme?id=${id}&user_id=${user_id}`);
  }

  getAllByAuthor(id: string, user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}author?id=${id}&user_id=${user_id}`);
  }

  getAllByTag(id: string, user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}tag?id=${id}&user_id=${user_id}`);
  }
}
