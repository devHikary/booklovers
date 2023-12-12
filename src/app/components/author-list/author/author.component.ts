import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  author: Author = new Author();
  isNew: boolean = true;
  isAuthorEmpty: boolean = false;

  public authorForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private authorService: AuthorService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] != 'new') {
        this.authorService.getById(params['id']).subscribe((response: any) => {
          this.isNew = false;

          this.setAuthor(response);
        });
      }
    });
  }

  setAuthor(response: any) {
    this.authorForm.setValue({
      id: response.id,
      name: response.name,
    });
  }

  get name() {
    return this.authorForm.get('name');
  }

  cancel() {
    this.location.back();
  }

  save() {
    if (this.authorForm.invalid) return;

    this.getAuthor();

    if (this.isNew) {
      this.authorService.add(this.author).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          });
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
      this.authorService.update(this.author).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          });
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
    }
  }

  getAuthor() {
    if (!this.isNew) this.author.id = this.authorForm.value.id!;

    this.author.name = this.authorForm.value.name!;
  }
}
