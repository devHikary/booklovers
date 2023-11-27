import Swal from 'sweetalert2';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BooksService } from 'src/app/services/books.service';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css'],
})
export class DetailBookComponent implements OnInit {
  public book: Book = new Book();
  html_string: string = '';
  localUrl: any;

  //selectedFile: ImageSnippet = new ImageSnippet('', '');

  selectedFile!: File;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  //public release_dt: string = "";

  public bookForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl(''),
    authors: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    thumbnail: new FormControl(''),
    rating: new FormControl(0),
    favorite: new FormControl(0),
    release_dt: new FormControl(''),
    pages: new FormControl(''),
    description: new FormControl(''),
    themes: new FormControl<string[]>([]),
  });

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private bookService: BooksService,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.bookService.getById(params['id']).subscribe((response: any) => {
        console.log(response);
        this.book.title = response.volumeInfo.title;
        this.book.id = response.volumeInfo.industryIdentifiers[0].identifier;
        this.book.pages = this.handleUndefined(response.volumeInfo.pageCount);
        this.book.themes = response.volumeInfo.categories;
        this.book.release_dt = response.volumeInfo.publishedDate
          .split('-')
          .reverse()
          .join('/');
        this.book.authors = this.handleUndefined(response.volumeInfo.authors);
        this.book.publisher = this.handleUndefined(
          response.volumeInfo.publisher
        );
        //this.book.description = this.handleUndefined(response.volumeInfo.description).split('<b>').reverse().join(' ');
        this.book.description = this.removeHTMLTags(
          this.handleUndefined(response.volumeInfo.description)
        );
        this.html_string = response.volumeInfo.description;

        if (response.volumeInfo.imageLinks == undefined)
          this.book.thumbnail = '/./assets/images/noImage.png';
        else this.book.thumbnail = response.volumeInfo.imageLinks?.thumbnail;

        this.loadBook();
      });
    });
  }

  handleUndefined(variable: string) {
    return variable == undefined ? 'Informação não cadastrada' : variable;
  }

  removeHTMLTags(str: string) {
    return str.replace(/<[^>]*>/g, '');
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
      description: this.book.description,
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
  get description() {
    return this.bookForm.get('description');
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  save() {
    console.log(this.bookForm.get('release_dt')?.value);
  }

  cancel() {
    this.router.navigate(['/booklovers/explorer/']);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
     const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      const b64Data = event.target.result.split(',')[1];

      this.converterBlobtoImg(b64Data);

      // this.imageService.uploadImage(b64Data).subscribe(
      //   (res: any) => {
      //     Swal.fire({
      //       title: 'Sucesso!',
      //       text: 'Upload realizado com sucesso.',
      //       icon: 'success',
      //       timer: 2000,
      //     });
      //   },
      //   (err: any) => {
      //     Swal.fire({
      //       title: 'Erro!',
      //       text: err,
      //       icon: 'error',
      //       timer: 2000,
      //     });
      //   }
      // );
    });

    reader.readAsDataURL(file);

  }

  converterBlobtoImg(b64Data: Blob, contentType:string = "image/png"){
    const blob = this.b64toBlob(b64Data, contentType);
      const blobUrl = URL.createObjectURL(blob);

      this.book.thumbnail = blobUrl;
  }

  b64toBlob(b64Data: any, contentType = '', sliceSize = 512){
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };
}

