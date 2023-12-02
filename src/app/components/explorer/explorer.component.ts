import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

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


  constructor(
    private booksService: BooksService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadListBooks('a%rainha%vermelha');
    this.themeList = themeMock;
    this.themeList.forEach((e) => {
      console.log('name', e.name);
    });
    console.log('mock', this.themeList);

  }

  loadListBooks(titleSch: string): void {
    this.booksService.getAllByTitle(titleSch).subscribe((books: any) => {
      this.loadList(books);
    });
  }
  //  ToDo: retirar depois
  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  searchBook() {
    const t = this.titleSearch.split(' ').join('%');
    console.log(t);
    this.loadListBooks(t);
  }

  filterSide(id: string) {
    this.booksService.getAllByCategories(id).subscribe((books) => {
      this.loadList(books);
    });
  }

  loadList(books: any) {
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
