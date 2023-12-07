import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-card-box-h',
  templateUrl: './card-box-h.component.html',
  styleUrls: ['./card-box-h.component.css']
})
export class CardBoxHComponent implements OnInit {

  @Input() book: Book = new Book();

  constructor(
    private router: Router,
  ){}

  ngOnInit(): void {
    this.book.description = this.book.description.substring(0, 150) + "...";
  }


  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
	}

  detailBook(id: string){
    this.router.navigate(['/booklovers/detail-book/', id]);
  }
}
