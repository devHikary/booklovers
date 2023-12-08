import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private dataSource = new BehaviorSubject(false);
  private dataSourceAdm = new BehaviorSubject(false);
  private dataSourceUser = new BehaviorSubject('username');
  data = this.dataSource.asObservable();
  dataAdm = this.dataSourceAdm.asObservable();
  dataUser = this.dataSourceUser.asObservable();

  constructor() { }

  updateToggle(toggle: boolean) {
    this.dataSource.next(toggle);
  }

  updateAdm(toggle: boolean) {
    this.dataSourceAdm.next(toggle);
  }

  updateUser(name: string) {
    this.dataSourceUser.next(name);
  }
}
