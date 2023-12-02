import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-card-box-mini',
  templateUrl: './card-box-mini.component.html',
  styleUrls: ['./card-box-mini.component.css']
})
export class CardBoxMiniComponent implements OnInit{
  @Input() book: Book = new Book();

  constructor(
    private router: Router,
  ){
  }

  ngOnInit(): void {

  }

  detailBook(id: string){
    this.router.navigate(['/booklovers/detail-book/', id]);
  }
}
