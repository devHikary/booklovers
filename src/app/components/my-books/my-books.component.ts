import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/Book';
import { ListService } from 'src/app/services/list.service';
import { LocalService } from 'src/app/services/local.service';
import { ThemeService } from 'src/app/services/theme.service';
import { List } from 'src/app/models/List';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/Tag';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit{
  bookList: Book[] = [];
  themeList: any[] = [];
  listList: List[] = [];
  tagList: Tag[] = [];
  listObj: List = new List();
  tagObj: Tag = new Tag();
  closeResult = ''; // TODO: retirar
  user_id: string = '';
  objSelect: any = {name: 'Todos os livros', id: null , type: null, books: null};

  titleSearchCtr = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  public tagForm = new FormGroup({
    colorInput: new FormControl(''),
    title: new FormControl('', [Validators.required]),
  });

  public listForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private modalService: NgbModal,
    private themeService: ThemeService,
    private localService: LocalService,
    private listService: ListService,
    private tagService: TagService,
  ){}

  ngOnInit(): void {
    this.user_id = this.localService.getUserId();
    this.themeService.getAll().subscribe((themes: any) => {
      this.themeList = themes;
    });
    this.listService.getAll(this.user_id ).subscribe((lists: any) => {
      this.listList = lists;
    });
    this.tagService.getAllUser(this.user_id ).subscribe((tags: any) => {
      this.tagList = tags;
    });
    this.listService.getAllBooks(this.user_id).subscribe((books: any) => {
      this.loadBooks(books);
    });
  }

  get name(){
    return this.listForm.get('name');
  }

  get title(){
    return this.tagForm.get('title');
  }

  clearFilter(){
    this.objSelect = {name: 'Todos os livros', id: null , type: null, books: null};
    this.listService.getAllBooks(this.user_id).subscribe((books: any) => {
      this.loadBooks(books);
    });
    this.listService.getAll(this.user_id ).subscribe((lists: any) => {
      this.listList = lists;
    });
    this.tagService.getAllUser(this.user_id ).subscribe((tags: any) => {
      this.tagList = tags;
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

  filterSideTheme(obj: any) {
    this.objSelect = obj;
    this.objSelect.type = 'theme'
    console.log("obj tema", obj)

    this.themeService.getById(obj.id, this.user_id).subscribe((books) => {
      this.loadBooks(books);
    });
  }

  filterSideTag(obj: any) {
    this.objSelect = obj;
    this.objSelect.type = 'tag';
    this.tagObj.id = obj.id
    this.tagForm.controls.title.setValue(this.objSelect.name);

    console.log("objSelect", this.objSelect)

    this.tagService.getById(obj.id, this.user_id).subscribe((books) => {
      this.loadBooks(books);
    });
  }

  filterSideList(obj: any) {
    this.objSelect = obj;
    this.objSelect.type = 'list';
    this.listObj.id = obj.id
    this.listForm.controls.name.setValue(this.objSelect.name);

    console.log("objSelect", this.objSelect)

    this.listService.getById(this.objSelect.id).subscribe((books) => {
      this.loadBooks(books);
    });
  }

  loadBooks(books: any) {
    this.bookList = [];
    this.options = [];

    if (books.length > 0 ){
      books.forEach((obj: any) => {
        var bookAux = new Book();
        console.log(obj)

        bookAux.id = obj.book.id;
        bookAux.title = obj.book.title;
        this.options.push(obj.book.title);
        bookAux.publisher = obj.book.publisher;
        bookAux.description = obj.book.description;
        bookAux.authors = obj.book.Authors;
        if(obj.book.thumbnail === null){
          bookAux.thumbnail = '/./assets/images/noImage.png';
        } else {
          bookAux.thumbnail = obj.book.thumbnail;
        }
        bookAux.annotation = obj.annotation; //TODO
        if(obj.annotation){
          bookAux.annotation.rating = obj.annotation.rating;
          bookAux.annotation.favorite = obj.annotation.favorite;
        }

        this.bookList.push(bookAux);
      });
    }
  }

    deleteList(modal: any){
    console.log('delete')

    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listService.delete(this.listObj.id).subscribe(
          (response) => {
            Swal.fire(
              'Deletado!',
              'Registro deletado.',
              'success'
            )
            this.modalService.dismissAll();
            this.tagForm.reset();
            this.clearFilter();
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
      }
    })

  }

  saveList(modal: any){
    if (this.listForm.invalid) {
      return;
    }

    this.getList();

    this.listService.add(this.listObj).subscribe(
      (response) => {
        Swal.fire({
          title: 'Salvo',
          text: 'Registro salvo com sucesso',
          icon: 'success',
          timer: 2000,
        });
        this.modalService.dismissAll();
        this.listForm.reset();
        this.clearFilter();
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

  }

  getList(){
    this.listObj.name = this.listForm.value.name;
    this.listObj.user_id = this.user_id;
    this.listObj.books = null;
  }

  deleteTag(modal: any){
    console.log('delete')

    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tagService.delete(this.tagObj.id).subscribe(
          (response) => {
            Swal.fire(
              'Deletado!',
              'Registro deletado.',
              'success'
            )
            this.modalService.dismissAll();
            this.tagForm.reset();
            this.clearFilter();
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
      }
    })

  }

  getTag(){
    this.tagObj.name = this.tagForm.value.title;
    this.tagObj.user_id = this.user_id;
  }

  saveTag(modal: any){
    console.log(modal)
    if (this.tagForm.invalid) {
      return;
    }

    this.getTag();

    if(this.tagObj.id === null){
      this.tagService.add(this.tagObj).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          });
          this.modalService.dismissAll();
          this.tagForm.reset();
          this.clearFilter();
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
    } else{
      this.tagService.update(this.tagObj).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          });
          this.modalService.dismissAll();
          this.listForm.reset();
          this.clearFilter();
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
    }

  }
}
