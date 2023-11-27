import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-card-box-v',
  templateUrl: './card-box-v.component.html',
  styleUrls: ['./card-box-v.component.css']
})
export class CardBoxVComponent {
  @Input() book: Book = new Book();

  constructor(
    private router: Router,
  ){}
  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
	}

  detailBook(id: string){
    this.router.navigate(['/booklovers/detail-book/', id]);
  }
}
