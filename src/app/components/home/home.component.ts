import { LocalService } from './../../services/local.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AnnotationService } from 'src/app/services/annotation.service';
import { Book } from 'src/app/models/Book';
import { GoalService } from 'src/app/services/goal.service';
import { Goal } from 'src/app/models/Goal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  favoriteList: Book[] = [];
  readingList: any[] = [];
  readingListSmall: any[] = [];
  finishedList: Book[] = [];
  andamentoList: Goal[] = [];
  user_id: string = '';
  public currentWindowWidth: number;

  constructor(
    private localService: LocalService,
    private annotationService: AnnotationService,
    private goalService: GoalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
    this.user_id = this.localService.getUserId();
    this.annotationService
      .getFavorite(this.user_id)
      .subscribe((response: any[]) => {
        this.favoriteList = this.loadBooks(response);
      });
    this.annotationService
      .getFinished(this.user_id)
      .subscribe((response: any[]) => {
        this.finishedList = this.loadBooks(response);
      });
    this.annotationService
      .getReading(this.user_id)
      .subscribe((response: any[]) => {
        this.readingListSmall = this.loadBooks(response);
        this.readingList = this.separar(this.readingListSmall, 2);
      });
    this.goalService.getAndamento(this.user_id).subscribe((response: any[]) => {
      this.andamentoList = response['goals'];
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }

  separar(base: any, max: any) {
    var res = [];
    if (base != undefined) {
      for (var i = 0; i < base.length; i = i + (max - 1)) {
        res.push(base.slice(i, i + max));
        max++;
      }
    }
    //res[res.length-1].push(base[0]); acrescentar o livro 1 no último grupo

    return res;
  }

  loadBooks(books: any[]): any[]{
    let list = [];

    if (books.length > 0) {
      books.forEach((obj: any) => {
        var bookAux = new Book();
        bookAux.id = obj.book.id;
        bookAux.title = obj.book.title;
        // this.options.push(obj.book.title);
        bookAux.publisher = obj.book.publisher;
        bookAux.description = obj.book.description;
        bookAux.authors = obj.book.Authors;
        if (obj.book.thumbnail === null) {
          bookAux.thumbnail = '/./assets/images/noImage.png';
        } else {
          bookAux.thumbnail = obj.book.thumbnail;
        }
        bookAux.annotation = obj.annotation; //TODO
        if (obj.annotation != null) {
          bookAux.annotation.rating = obj.annotation.rating;
          bookAux.annotation.favorite = obj.annotation.favorite;
          bookAux.annotation.tags = obj.annotation.tags;
          bookAux.annotation.progress = obj.annotation.progress;
        }

        list.push(bookAux);
      });

    }
    return list;
  }

  refreshFavorites(){
    this.annotationService
      .getFavorite(this.user_id)
      .subscribe((response: any) => {
        this.favoriteList = this.loadBooks(response);
      });
  }

  detailBook(id: string){
    this.router.navigate(['/booklovers/detail-book/', id]);
  }

  detailGoal(id: string){
    this.router.navigate(['/booklovers/goal/', id]);
  }

  reportFailure() {
    this.router.navigate(['/booklovers/report-failure'], {
      queryParams: { b: null, id: 'new' },
    });
  }
}
