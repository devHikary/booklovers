import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private dataSource = new BehaviorSubject(false);
  data = this.dataSource.asObservable();

  constructor() { }

  updateToggle(toggle: boolean) {
    this.dataSource.next(toggle);
  }
}
