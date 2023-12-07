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
}
