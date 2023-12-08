import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent implements OnInit {
  isMenuCollapsed = true;

  isShowHeader: boolean = false;

  constructor(
    private localService: LocalService,
    private router: Router,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.data.subscribe((arg: boolean) => {
      this.isShowHeader = arg;
    });

    console.log('isShowHeader', this.isShowHeader);
  }

  logout() {
    this.localService.clearStorage();
    this.router.navigateByUrl('/booklovers/login');
    this.headerService.updateToggle(false);
  }

}
