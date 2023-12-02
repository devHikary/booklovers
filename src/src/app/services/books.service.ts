import { Book } from 'src/app/models/book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private controllerName = "books/";
  constructor(
    private http: HttpClient,
  ) { }

  getAllBooks(){
    return this.http.get(`${urlAPI}${this.controllerName}`);
  }

  getById(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}${id}`);
  }

  public add(b: Book) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, b);
  }

  public update(b: Book) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.put(request, b);
  }
}
