import { Book } from 'src/app/models/Book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalService } from './local.service';
const { urlAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private controllerName = "books/";

  constructor(
    private http: HttpClient,
    private localService: LocalService,
  ) { }

  getAllBooks(user_id: string){
    return this.http.get(`${urlAPI}${this.controllerName}${user_id}`);
  }

  getById(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}id/${id}`);
  }

  getByIdUser(id: string, user_id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}${id}/u/${user_id}`);
  }

  getByTitle(title: string, user_id: string) {
    // return this.http.get(`${urlAPI}${this.controllerName}title/${title}/u/${user_id}`);
    return this.http.get(`${urlAPI}${this.controllerName}title/t?t=${title}&u=${user_id}`);
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
