import Swal from 'sweetalert2';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Annotation } from 'src/app/models/Annotation';
import { Book } from 'src/app/models/Book';
import { AnnotationService } from 'src/app/services/annotation.service';
import { LocalService } from 'src/app/services/local.service';


@Component({
  selector: 'app-card-box-v',
  templateUrl: './card-box-v.component.html',
  styleUrls: ['./card-box-v.component.css']
})
export class CardBoxVComponent {
  @Input() book: Book = new Book();
  @Input() annotation: Annotation = new Annotation();
  @Output() annotationChange = new EventEmitter<Annotation>();

  constructor(
    private router: Router,
    private annotationService: AnnotationService,
    private localService: LocalService,
  ){}

  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
	}

  detailBook(id: string){
    this.router.navigate(['/booklovers/detail-book/', id]);
  }

  toggleFavorite(){
    if(this.book.annotation == null)
      this.book.annotation = new Annotation();
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
    if (this.annotation === null) {
      this.annotation = new Annotation();
      this.annotation.book_id = this.book.id;
      this.annotation.user_id = this.localService.getUserId();
      this.annotation.favorite = this.book.annotation.favorite;
      this.annotationService.add(this.annotation).subscribe((response: Annotation) =>{
        this.annotationChange.emit(response);
      });

    } else {
      if(this.annotation.id === null){
        this.annotation.book_id = this.book.id;
        this.annotation.user_id = this.localService.getUserId();
        this.annotation.favorite = this.book.annotation.favorite;
        this.annotationService.add(this.annotation).subscribe();
      }else{
        this.annotationService.update(this.annotation).subscribe();
      }

    }
  }
}
