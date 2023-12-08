import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReportFailure } from '../models/ReportFailure';
const { urlAPI } = environment;


@Injectable({
  providedIn: 'root'
})
export class ReportFailureService {

  private controllerName = "reportFailures/";
  constructor(
    private http: HttpClient,
  ) { }

  public add(r: ReportFailure) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.post(request, r);
  }

  public update(r: ReportFailure) {
    let request = `${urlAPI}${this.controllerName}`;
    return this.http.put(request, r);
  }

  getAll(){
    return this.http.get(`${urlAPI}${this.controllerName}`);
  }

  getById(id: string) {
    return this.http.get(`${urlAPI}${this.controllerName}${id}`);
  }

}
