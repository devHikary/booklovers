import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Annotation } from 'src/app/models/Annotation';
import { Book } from 'src/app/models/Book';
import { Tag } from 'src/app/models/Tag';
import { AnnotationService } from 'src/app/services/annotation.service';

@Component({
  selector: 'app-card-box-mini',
  templateUrl: './card-box-mini.component.html',
  styleUrls: ['./card-box-mini.component.css']
})
export class CardBoxMiniComponent implements OnInit{
  @Input() book: Book = new Book();
  @Input() annotation: Annotation = new Annotation();
  @Input() tags: Tag[] = [];

  constructor(
    private router: Router,
    private annotationService: AnnotationService,
  ){
  }

  ngOnInit(): void {

  }

  detailBook(id: string){
    this.router.navigate(['/booklovers/detail-book/', id]);
  }


  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
	}

  toggleFavorite(){
    if(this.book.annotation.favorite == 1)
      this.book.annotation.favorite = 0;
    else{
      this.book.annotation.favorite = 1;
    }
    this.saveAnnotation();
  }

  toggleRate(){
    this.saveAnnotation();
  }

  saveAnnotation(){
    console.log(this.annotation)
    if (this.annotation === null) {
      this.annotationService.add(this.annotation).subscribe();

    } else {
      this.annotationService.update(this.annotation).subscribe();
    }
  }


}
