import Swal from 'sweetalert2';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProcessFile } from 'src/app/shared/processFile/processFile';
import { Buffer } from 'buffer';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { Observable, map, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css'],
})
export class ExplorerComponent implements OnInit {
  bookList: Book[] = [];
  themeList: any[] = [];
  public titleSearch: string = ''; // TODO: retirar
  closeResult = ''; // TODO: retirar

  titleSearchCtr = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  public tagForm = new FormGroup({
    colorInput: new FormControl(''),
    title: new FormControl('', [Validators.required]),
  });

  constructor(
    private booksService: BooksService,
    private modalService: NgbModal,
    private googleService: GoogleBooksService,
    private router: Router,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.titleSearchCtr.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.booksService.getAllBooks().subscribe((books: any) => {
      console.log(books);
      this.loadBooks(books);
    });
    this.themeService.getAll().subscribe((themes: any) => {
      this.themeList = themes;
    });
  }

  //  ToDo: retirar depois
  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  searchBook() {
    // const t = this.titleSearchCtr.value.split(' ').join('%');
    // console.log(t);
    this.booksService.getByTitle(this.titleSearchCtr.value).subscribe((books: any) => {
      this.loadBooks(books);
    });
  }

  filterSide(id: string) {
    this.themeService.getById(id).subscribe((books) => {
      this.loadBooks(books);
    });
  }

  loadListGoogle(books: any) {
    console.log(books);
    var list: any[] = [];
    this.bookList = [];

    list = books.items;

    list.forEach((element) => {
      var bookAux = new Book();
      // ToDo:retirar
      bookAux.id = element.selfLink;
      // ToDo: voltar essa implementação do id
      //bookAux.id = element.volumeInfo.industryIdentifiers[0].identifier;

      bookAux.title = element.volumeInfo.title.toLowerCase();
      bookAux.authors =
        element.volumeInfo.authors == undefined
          ? 'Autor não cadastrado'
          : element.volumeInfo.authors.toString().toLowerCase();
      bookAux.publisher =
        element.volumeInfo.publisher == undefined
          ? 'Editora não cadastrado'
          : element.volumeInfo.publisher.toString().toLowerCase();

      if (element.volumeInfo.imageLinks == undefined)
        bookAux.thumbnail = '/./assets/images/noImage.png';
      else bookAux.thumbnail = element.volumeInfo.imageLinks?.thumbnail;

      console.log(element.volumeInfo.imageLinks);
      //  ToDo: retirar
      const rndInt = this.randomIntFromInterval(1, 5);
      bookAux.rating = rndInt;
      const rndIntb = this.randomIntFromInterval(0, 1);
      bookAux.favorite = rndIntb;

      bookAux.description = element.volumeInfo.description;

      // ToDo: retirar - fim
      this.bookList.push(bookAux);
    });
  }

  loadBooks(books: any) {
    this.bookList = [];
    this.options = [];
    books.forEach((book: any) => {
      var bookAux = new Book();

      bookAux.id = book.id;
      bookAux.title = book.title;
      this.options.push(book.title);
      bookAux.publisher = book.publisher;
      bookAux.description = book.description;
      bookAux.authors = book.Authors;
      if(book.thumbnail === null){
        bookAux.thumbnail = '/./assets/images/noImage.png';
      } else {
        bookAux.thumbnail = book.thumbnail;
      }

      this.bookList.push(bookAux);
    });
    // var base64 = this.getBase64Image(document.getElementById("imageid"));
    // console.log(base64)
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed`;
        }
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  detailBook(id: string){
    this.router.navigate(['/booklovers/detail-book/', id]);
  }
}

const themeMock = [
  {
    id: 'Romance',
    name: 'Romance',
  },
  {
    id: 'Juvenile Fiction',
    name: 'Ficção Juvenil',
  },
  {
    id: 'Action & Adventure',
    name: 'Ação e Aventura',
  },
  {
    id: 'Dystopian',
    name: 'Distopia',
  },
];
