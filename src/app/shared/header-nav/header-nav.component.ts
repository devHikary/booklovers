import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit{
  isMenuCollapsed = true;

  isLogin: boolean = true;

  constructor(
    private localService: LocalService,
    private router: Router,
  ){}

  ngOnInit(): void {
    console.log(this.router.url);
    if(this.router.url == '/')
      this.isLogin = true;
    else
      this.isLogin = false;
      console.log("isLogin", this.isLogin);
  }

  logout(){
    this.localService.clearStorage();
    this.router.navigateByUrl('/booklovers/login');
  }
}
