import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {
  bookList: Book[] = [];

  constructor(
    private booksService: BooksService,
  ) { }

  ngOnInit(): void {
    this.booksService.getAllByTitle("a%rainha%vermelha").subscribe((books : any) => {
      console.log(books)
      var list: any[] = [];

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

        console.log(bookAux)
        console.log(element.volumeInfo.imageLinks?.thumbnail)
        // ToDo: retirar - fim
        this.bookList.push(bookAux);
      });
    })
  }

  //  ToDo: retirar depois
  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


}
