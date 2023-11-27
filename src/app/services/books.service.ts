import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private urlAPI = "https://www.googleapis.com/books";
  private controllerName = "/v1/volumes?q=intitle:";
  constructor(
    private http: HttpClient,
  ) { }

  getAllByTitle(title: string) {
    return this.http.get(`${this.urlAPI}${this.controllerName}${title}`);
  }

  getById(id: string) {
    return this.http.get(`${id}`);
  }
}
