import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-unavailable',
  templateUrl: './error-unavailable.component.html',
  styleUrls: ['./error-unavailable.component.css']
})
export class ErrorUnavailableComponent {
  constructor(
    private location: Location,
  ){}

  back(){
    this.location.back();
  }
}
