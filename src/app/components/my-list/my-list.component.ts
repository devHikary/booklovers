import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/models/Book';
import { List } from 'src/app/models/List';
import { Tag } from 'src/app/models/Tag';
import { ListService } from 'src/app/services/list.service';
import { LocalService } from 'src/app/services/local.service';
import { TagService } from 'src/app/services/tag.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit{
  bookList: Book[] = [];
  tagList: Tag[] = [];
  listList: List[] = [];
  listObj: List = new List();
  tagObj: Tag = new Tag();

  closeResult: string = '';
  user_id: string = '';

  public tagForm = new FormGroup({
    colorInput: new FormControl(''),
    title: new FormControl('', [Validators.required]),
  });

  public listForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private modalService: NgbModal,
    private tagService: TagService,
    private listService: ListService,
    private localService: LocalService,
  ){}

  ngOnInit(): void {
    this.user_id = this.localService.getUserId();
  }

  get name(){
    return this.listForm.get('name');
  }

  get title(){
    return this.tagForm.get('title');
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

  selectList(){
    this.listService.getAllBooks(this.user_id).subscribe((response: any)=>{

    })
  }

  selectTag(){}

  getList(){
    this.listObj.name = this.listForm.value.name;
    this.listObj.user_id = this.user_id;
    this.listObj.books = null;
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
        modal.close('saveList');
        this.listForm.reset();
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

  getTag(){
    this.listObj.name = this.listForm.value.name;
    this.listObj.user_id = this.user_id;
    this.listObj.books = null;
  }

  saveTag(modal: any){
    if (this.listForm.invalid) {
      return;
    }

    this.getTag();

    this.tagService.add(this.tagObj).subscribe(
      (response) => {
        Swal.fire({
          title: 'Salvo',
          text: 'Registro salvo com sucesso',
          icon: 'success',
          timer: 2000,
        });
        modal.close('saveList');
        this.listForm.reset();
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
