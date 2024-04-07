import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Annotation } from 'src/app/models/Annotation';
import { Book } from 'src/app/models/Book';
import { List } from 'src/app/models/List';
import { Tag } from 'src/app/models/Tag';
import { AnnotationService } from 'src/app/services/annotation.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-card-box-h',
  templateUrl: './card-box-h.component.html',
  styleUrls: ['./card-box-h.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CardBoxHComponent implements OnInit {
  @Input() book: Book = new Book();
  @Input() annotation: Annotation = new Annotation();
  @Input() tags: Tag[] = [];
  @Input() isEdit: boolean = true;
  expanded: boolean = false;
  public isCollapsed: boolean = true;

  listCtr = new FormControl('');

  constructor(
    private router: Router,
    private annotationService: AnnotationService,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this.book.description = this.book.description.substring(0, 130) + '...';
  }

  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
  }

  detailBook(id: string) {
    this.router.navigate(['/booklovers/detail-book/', id]);
  }

  toggleFavorite() {
    if (this.book.annotation.favorite == 1) this.book.annotation.favorite = 0;
    else {
      this.book.annotation.favorite = 1;
    }
    this.saveAnnotation();
  }

  toggleRate() {
    this.saveAnnotation();
  }

  saveAnnotation() {
    if (this.annotation === null) {
      this.annotationService.add(this.annotation).subscribe();
    } else {
      this.annotationService.update(this.annotation).subscribe();
    }
  }

  showCheckboxes() {
    var checkboxes = document.getElementById('checkboxes');
    if (!this.expanded) {
      checkboxes.style.display = 'block';
      this.expanded = true;
    } else {
      checkboxes.style.display = 'none';
      this.expanded = false;
    }
  }

  saveList(book_id: string) {
    let obj = { book_id: book_id, list_id: this.listCtr.value };
    this.listService.addBook(obj).subscribe();
  }

  handleImage(url: string) {
    let img = new Image();
    img.src = url;
    img.crossOrigin = 'anonymous';
    return img;
  }
}
