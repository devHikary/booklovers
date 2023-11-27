import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit{
  public book: Book = new Book();
	//public release_dt: string = "";

  public bookForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl('', ),
    authors: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    thumbnail: new FormControl('', ),
    rating: new FormControl(0, ),
    favorite: new FormControl(0,),
    release_dt: new FormControl('', ),
    pages: new FormControl('', ),
    themes: new FormControl<string[]>([], ),

  });

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private bookService: BooksService,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ){}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.bookService.getById(params['id']).subscribe((response: any) => {
        console.log(response)
        this.book.title = response.volumeInfo.title;
        this.book.id = response.volumeInfo.industryIdentifiers[0].identifier;
        this.book.pages = response.volumeInfo.pageCount;
        this.book.themes = response.volumeInfo.categories;
        this.book.release_dt = response.volumeInfo.publishedDate.split('-').reverse().join('/');
        this.book.authors = response.volumeInfo.authors == undefined ? "Autor não cadastrado"
                                                      : response.volumeInfo.authors;
                                                      this.book.publisher = response.volumeInfo.publisher == undefined ? "Editora não cadastrado"
                                                      : response.volumeInfo.publisher;

        if(response.volumeInfo.imageLinks == undefined)
          this.book.thumbnail = "/./assets/images/noImage.png";
        else
          this.book.thumbnail = response.volumeInfo.imageLinks?.thumbnail;

        this.loadBook();

      })
    })
  }

  loadBook() {
    this.bookForm.setValue({
      id: this.book.id,
      title: this.book.title,
      subtitle: this.book.subtitle,
      authors: this.book.authors,
      publisher: this.book.publisher,
      thumbnail: this.book.thumbnail,
      rating: this.book.rating,
      favorite: this.book.favorite,
      release_dt: this.book.release_dt,
      pages: this.book.pages,
      themes: this.book.themes,
    });
  }

  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`;
	}

  get id() {
    return this.bookForm.get('id');
  }
  get title() {
    return this.bookForm.get('title');
  }
  get subtitle() {
    return this.bookForm.get('subtitle');
  }
  get authors() {
    return this.bookForm.get('authors');
  }
  get publisher() {
    return this.bookForm.get('publisher');
  }
  get thumbnail() {
    return this.bookForm.get('thumbnail');
  }
  get rating() {
    return this.bookForm.get('rating');
  }
  get favorite() {
    return this.bookForm.get('favorite');
  }
  get release_dt() {
    return this.bookForm.get('release_dt');
  }
  get pages() {
    return this.bookForm.get('pages');
  }
  get themes() {
    return this.bookForm.get('themes');
  }

  get today() {
		return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
	}

  save(){
    console.log(this.bookForm.get('release_dt')?.value);
  }

  cancel(){
    this.router.navigate(['/booklovers/explorer/']);
  }
}
