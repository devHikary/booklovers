import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private urlAPIg = "https://www.googleapis.com/books";
  private verApig = "/v1/volumes?q=";

  constructor(
    private http: HttpClient,
  ) { }

  getAllBooks(){
    return this.http.get(`${this.urlAPIg}${this.verApig}`);
  }

  getAllByTitle(title: string) {
    return this.http.get(`${this.urlAPIg}${this.verApig}intitle:${title}`);
  }

  getAllByCategories(categories: string) {
    return this.http.get(`${this.urlAPIg}${this.verApig}subject:${categories}`);
  }

  getById(id: string) {
    return this.http.get(`${id}`);
  }

}
