import Swal from 'sweetalert2';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Annotation } from 'src/app/models/Annotation';
import { Book } from 'src/app/models/Book';
import { AnnotationService } from 'src/app/services/annotation.service';

@Component({
  selector: 'app-card-box-v',
  templateUrl: './card-box-v.component.html',
  styleUrls: ['./card-box-v.component.css']
})
export class CardBoxVComponent {
  @Input() book: Book = new Book();
  @Input() annotation: Annotation = new Annotation();

  constructor(
    private router: Router,
    private annotationService: AnnotationService,
  ){}

  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
	}

  detailBook(id: string){
    this.router.navigate(['/booklovers/detail-book/', id]);
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
