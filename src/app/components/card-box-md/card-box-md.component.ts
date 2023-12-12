import { Component, Input } from '@angular/core';
import { Annotation } from 'src/app/models/Annotation';
import { Book } from 'src/app/models/Book';
import { Tag } from 'src/app/models/Tag';

@Component({
  selector: 'app-card-box-md',
  templateUrl: './card-box-md.component.html',
  styleUrls: ['./card-box-md.component.css']
})
export class CardBoxMdComponent {
  @Input() book: Book = new Book();
  @Input() annotation: Annotation = new Annotation();
  @Input() tags: Tag[] = [];

  constructor(){
  }

}
