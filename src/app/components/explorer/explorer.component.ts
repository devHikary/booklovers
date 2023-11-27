import { Component, OnInit } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
  bookList: Book[] = [];
  themeList: any[] = [];
  public titleSearch: string = "";

  constructor(
    private booksService: BooksService,
  ) { }

  ngOnInit(): void {
    this.loadListBooks("a%rainha%vermelha");
    this.themeList = themeMock;
    this.themeList.forEach((e) => {
      console.log("name", e.name);
    })
    console.log("mock", this.themeList);
  }

  loadListBooks(titleSch: string): void {
    this.booksService.getAllByTitle(titleSch).subscribe((books : any) => {
      this.loadList(books);
    })
  }
  //  ToDo: retirar depois
  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  searchBook(){
    const t = this.titleSearch.split(' ').join('%');
    console.log(t);
    this.loadListBooks(t);
  }

  filterSide(id: string){
    this.booksService.getAllByCategories(id).subscribe(books =>{
      this.loadList(books);
    })
  }

  loadList(books: any){
    console.log(books)
      var list: any[] = [];
      this.bookList = [];

      list = books.items;
      list.forEach(element => {
        var bookAux = new Book();
        // ToDo:retirar
        bookAux.id = element.selfLink;
        // ToDo: voltar essa implementação do id
        //bookAux.id = element.volumeInfo.industryIdentifiers[0].identifier;

        bookAux.title = element.volumeInfo.title;
        bookAux.authors = element.volumeInfo.authors == undefined ? "Autor não cadastrado"
                                                      : element.volumeInfo.authors;
        bookAux.publisher = element.volumeInfo.publisher == undefined ? "Editora não cadastrado"
                                                      : element.volumeInfo.publisher;

        if(element.volumeInfo.imageLinks == undefined)
          bookAux.thumbnail = "/./assets/images/noImage.png";
        else
          bookAux.thumbnail = element.volumeInfo.imageLinks?.thumbnail;

        //  ToDo: retirar
        const rndInt = this.randomIntFromInterval(1, 5)
        bookAux.rating = rndInt;
        const rndIntb = this.randomIntFromInterval(0, 1)
        bookAux.favorite = rndIntb;

        // ToDo: retirar - fim
        this.bookList.push(bookAux);
      });
  }

}

const themeMock = [
  {
    "id": "Romance",
    "name": "Romance",
  },
  {
    "id": "Juvenile Fiction",
    "name": "Ficção Juvenil",
  },
  {
    "id": "Action & Adventure",
    "name": "Ação e Aventura",
  },
  {
    "id": "Dystopian",
    "name": "Distopia",
  },
]
