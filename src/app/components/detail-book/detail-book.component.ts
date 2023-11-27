import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit{
  public book: Book = new Book();

  public bookForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl('', ),
    authors: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    thumbnail: new FormControl('', ),
    rating: new FormControl(0, [Validators.required]),
    favorite: new FormControl(0, [Validators.required]),

  });

  constructor(
    private activedRoute: ActivatedRoute,
    private bookService: BooksService,
  ){}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.bookService.getById(params['id']).subscribe((response: any) => {
        console.log(response)
        this.book.title = response.volumeInfo.title;
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
}
