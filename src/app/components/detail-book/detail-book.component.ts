import { ProcessFile } from 'src/app/shared/processFile/processFile';
import Swal from 'sweetalert2';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { BooksService } from 'src/app/services/books.service';
import {
  NgbCalendar,
  NgbDate,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, of, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ThemeService } from 'src/app/services/theme.service';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';
import { Annotation } from 'src/app/models/Annotation';
import { LocalService } from 'src/app/services/local.service';
import { AnnotationService } from 'src/app/services/annotation.service';
import { Location } from '@angular/common';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailBookComponent implements OnInit {
  public book: Book = new Book();
  public annotationObj: Annotation = new Annotation();
  public isCollapsedThumbnail = true;
  isNew: boolean = true;
  user_id: string = '';
  isSaveDisabled: boolean = true;

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  maxDate = this.calendar.getToday();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  rateCtrl = new FormControl();
  favoriteCtrl = new FormControl();
  filteredTags: Observable<any[]> = new Observable<any[]>();
  selectedTags: any[] = [];
  allTags: any[] = [];
  @ViewChild('authorInput') authorInput: ElementRef<HTMLInputElement> =
    {} as ElementRef;
  public isCollapsed = true;



  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookService: BooksService,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private themeService: ThemeService,
    private authorService: AuthorService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    public localService: LocalService,
    public annotationService: AnnotationService,
    private location: Location,
    private tagService: TagService
  ) {
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.user_id = this.localService.getUserId();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterAuthor(name as string) : this.allTags.slice();
      })
    );
    this.tagService.getAllUser(this.user_id).subscribe((response: any) => {
      this.allTags = response;
    });

    this.book.thumbnail = '/./assets/images/noImage.png';

    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] != 'new') {
        this.bookService
          .getByIdUser(params['id'], this.user_id)
          .subscribe((response: any) => {
            console.log(response);
            this.isNew = false;
            this.loadBook(response['book']);
            this.loadAnnotation(response['annotation']);

          });
      }
    });
  }

  handleUndefined(variable: string) {
    return variable == undefined ? 'Informação não cadastrada' : variable;
  }

  removeHTMLTags(str: string) {
    return str.replace(/<[^>]*>/g, '');
  }

  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  save(f: any) {

    this.getAnnotation();

    if (this.isNew) {
      this.annotationService.add(this.annotationObj).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          });
          //this.router.navigate(['/booklovers/explorer']);
          this.location.back();
        },
        (e) => {
          Swal.fire({
            title: 'Erro!',
            text: e.error.error,
            icon: 'error',
            timer: 2000,
          });
        }
      );
    } else {
      this.annotationService.update(this.annotationObj).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          }).then(() => {
            //this.router.navigate(['/booklovers/explorer']);
            this.location.back();
          });
        },
        (e) => {
          console.log(e.error);
          Swal.fire({
            title: 'Erro!',
            text: e.error.error,
            icon: 'error',
            timer: 2000,
          });
        }
      );
    }
  }

  cancel() {
    //this.router.navigate(['/booklovers/explorer/']);
    this.location.back();
  }

  loadBook(book: any) {
    this.book.id = book.id;
    this.book.title = book.title;
    this.book.publisher = book.publisher;
    this.book.description = book.description;
    this.book.pages = book.pages;
    this.book.release_dt = book.release_dt;
    const sub_string = [];
    sub_string[0] = book.isbn_13.substring(0, 3);
    sub_string[1] = book.isbn_13.substring(3);
    this.book.isbn_13 = sub_string.join('-');
    this.book.themes = book.Themes;
    this.book.release_dt = book.release_dt
      .substring(0, 10)
      .split('-')
      .reverse()
      .join('/');

    this.book.authors = book.Authors;

    if (book.thumbnail === null) {
      this.book.thumbnail = '/./assets/images/noImage.png';
    } else {
      this.book.thumbnail = book.thumbnail;
    }
  }

  loadAnnotation(annotation: any) {
    if (!annotation) {
      this.isNew = true;
      return;
    }
    this.annotationObj.id = annotation.id;
    this.annotationObj.pages_read = annotation.pages_read;
    this.annotationObj.progress = annotation.progress;
    this.annotationObj.rating = annotation.rating;
    this.annotationObj.review = annotation.review;
    this.annotationObj.date_start = annotation.date_start;
    this.annotationObj.date_end = annotation.date_end;
    this.annotationObj.favorite = annotation.favorite;
    this.annotationObj.tags = annotation.tags;

    if (annotation.date_start != null) {
      let start = annotation.date_start.substring(0, 10).split('-').reverse();
      this.fromDate = new NgbDate(+start[2], +start[1], +start[0]);
    }

    if (annotation.date_end != null) {
      let end = annotation.date_end.substring(0, 10).split('-').reverse();
      this.toDate = new NgbDate(+end[2], +end[1], +end[0]);
    }

    this.selectedTags = [];
    this.selectedTags = annotation.tags;
  }

  percentChanged() {
    if (this.annotationObj.progress < 0) {
      this.annotationObj.pages_read = 0;
      this.annotationObj.progress = 0;
    }
    if (this.annotationObj.progress > 100) {
      this.annotationObj.pages_read = +this.book.pages;
      this.annotationObj.progress = 100;
    } else {
      this.annotationObj.pages_read = Math.round(
        (+this.book.pages * this.annotationObj.progress) / 100
      );
    }
  }

  pages_readChanged() {
    if (this.annotationObj.pages_read < 0) {
      this.annotationObj.pages_read = 0;
      this.annotationObj.progress = 0;
    }
    if (this.annotationObj.pages_read > +this.book.pages) {
      this.annotationObj.pages_read = +this.book.pages;
      this.annotationObj.progress = 100;
    } else {
      this.annotationObj.progress = Math.round(
        (this.annotationObj.pages_read / +this.book.pages) * 100
      );
    }
  }

  getAnnotation() {
    this.annotationObj.user_id = this.localService.getUserId();
    this.annotationObj.book_id = this.book.id;
    // this.annotationObj.date_start = this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day;
    // this.annotationObj.date_end = this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day;
    console.log('this.fromDate', this.fromDate);
    this.annotationObj.date_start = null;
    if (this.fromDate != undefined) {
      this.annotationObj.date_start =
        this.fromDate.month +
        '/' +
        this.fromDate.day +
        '/' +
        this.fromDate.year;
    }
    console.log('this.fromDate', this.annotationObj.date_start);

    this.annotationObj.date_end = null;
    if (this.toDate != undefined) {
      this.annotationObj.date_end =
        this.toDate.month + '/' + this.toDate.day + '/' + this.toDate.year;
    }
    // this.annotationObj.rating = this.book.rating;
    // this.annotationObj.favorite = this.book.favorite;
    this.annotationObj.tags = this.selectedTags;
    if (this.selectedTags.length < 0) this.annotationObj.tags = null;

    console.log(this.fromDate);
    console.log(this.toDate);

    // this.book.release_dt = this.bookForm.value
    //   .release_dt!.split('/')
    //   .reverse()
    //   .join('-');

    console.log('save **** ', this.annotationObj);
  }

  // onDateSelection(date: NgbDate) {
  //   if (!this.fromDate && !this.toDate) {
  //     this.fromDate = date;
  //   } else if (
  //     this.fromDate &&
  //     !this.toDate &&
  //     date &&
  //     date.after(this.fromDate)
  //   ) {
  //     this.toDate = date;
  //   } else {
  //     this.toDate = null;
  //     this.fromDate = date;
  //   }
  // }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate) || date.equals(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && (date.before(this.toDate) );
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    console.log("parsed",parsed);
    console.log("NgbDate.from(parsed)",NgbDate.from(parsed));
    console.log("currentValue",currentValue);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : null;
  }

  editBook(id: string) {
    this.router.navigate(['/booklovers/edit-book/', id]);
  }

  toggleFavorite() {
    if (this.annotationObj.favorite == 1) this.annotationObj.favorite = 0;
    else {
      this.annotationObj.favorite = 1;
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.selectedTags.push({ id: null, name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
    // console.log(this.selectedThemes)
  }

  removeTag(author: string): void {
    const index = this.selectedTags.indexOf(author);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  selectedAuthor(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.value);
    this.authorInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filterAuthor(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFnTag(author: any): string {
    return author && author.name ? author.name : '';
  }

  isTagSelected(author: any): boolean {
    const e = this.selectedTags.find((t) => t.name == author.name);
    if (e) return true;
    else return false;
  }
}
