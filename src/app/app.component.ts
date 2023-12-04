import { Component } from '@angular/core';
import { LocalService } from './services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book';

  constructor(
    private localService: LocalService,
    private router: Router,
  ){}

  logout(){
    this.localService.clearStorage();
    this.router.navigateByUrl('/booklovers/login');
  }
}
