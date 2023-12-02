import { Book } from 'src/app/models/book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private urlAPIg = "https://www.googleapis.com/books";
  private verApig = "/v1/volumes?q=";
  private controllerName = "books/";
  constructor(
    private http: HttpClient,
  ) { }

  getAllBooks(){
    return this.http.get(`${urlAPI}${this.controllerName}`);
  }

  getAllByTitle(title: string) {
    return this.http.get(`${this.urlAPIg}${this.verApig}intitle:${title}`);
  }

  getAllByCategories(categories: string) {
    return this.http.get(`${this.urlAPIg}${this.verApig}subject:${categories}`);
  }

  getById(id: string) {
    // return this.http.get(`${id}`);
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
