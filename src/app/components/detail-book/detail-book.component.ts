import { ProcessFile } from 'src/app/shared/processFile/processFile';
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
import { Buffer } from 'buffer';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css'],
})
export class DetailBookComponent implements OnInit {
  public book: Book = new Book();
  html_string: string = '';
  b64Data: any;
  localUrl: any;
  myVar: boolean = false; // TODO: retirar
  autorTeste: any; // TODO: retirar

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
    thumbnail: new FormControl<string | null | Blob>(''),
    rating: new FormControl(0),
    favorite: new FormControl(0),
    isbn_13: new FormControl('', [Validators.required]),
    release_dt: new FormControl(''),
    pages: new FormControl('', [Validators.required]),
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
        this.loadBook(response);

        this.setBook();
      });
    });
  }

  handleUndefined(variable: string) {
    return variable == undefined ? 'Informação não cadastrada' : variable;
  }

  removeHTMLTags(str: string) {
    return str.replace(/<[^>]*>/g, '');
  }

  setBook() {
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
      isbn_13: this.book.isbn_13,
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
    this.getBook();
    this.book.authors = this.autorTeste;
    if (this.book.id === null) {
      this.bookService.add(this.book).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          });
          //this.router.navigate(['/emicol/talhao']);
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
      this.bookService.update(this.book).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          });
          //this.router.navigate(['/emicol/talhao']);
        },
        (e) => {
          console.log(e.error);
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

  cancel() {
    this.router.navigate(['/booklovers/explorer/']);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      const b64Data = event.target.result.split(',')[1];

      console.log('b64Data', b64Data);
      const blob = ProcessFile.converterBlobtoImg(b64Data);
      //const blobUrl = URL.createObjectURL(blob);
      this.b64Data = b64Data;

      this.book.thumbnail = ProcessFile.converterBlobtoImg(b64Data);
      console.log('upload----', this.book.thumbnail);
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

  // TODO: retirar
  toggleTeste() {
    this.myVar = !this.myVar;
  }

  loadByAPIGoogle(response: any) {
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
    this.book.publisher = this.handleUndefined(response.volumeInfo.publisher);
    //this.book.description = this.handleUndefined(response.volumeInfo.description).split('<b>').reverse().join(' ');
    this.book.description = this.removeHTMLTags(
      this.handleUndefined(response.volumeInfo.description)
    );
    this.html_string = response.volumeInfo.description;

    if (response.volumeInfo.imageLinks == undefined)
      this.book.thumbnail = '/./assets/images/noImage.png';
    else this.book.thumbnail = response.volumeInfo.imageLinks?.thumbnail;
  }

  loadBook(book: any) {
    this.book.id = book.id;
    this.book.title = book.title;
    this.book.publisher = book.publisher;
    this.book.description = book.description;
    this.book.pages = book.pages;
    this.book.release_dt = book.release_dt;
    this.book.isbn_13 = book.isbn_13;
    this.book.release_dt = book.release_dt.split('-')
    .reverse()
    .join('/');
    this.autorTeste = book.Authors;
    book.Authors.forEach((author: any) => {
      this.book.authors += author.name + "; ";
    });

    if (book.thumbnail === null && book.thumbnail_url === null) {
      this.book.thumbnail = '/./assets/images/noImage.png';
    } else if (book.thumbnail_url === null) {
      console.log('blob-------');
      const t = Buffer.from(book.thumbnail).toString();

      const blobUrl = 'data:image/png;base64, ' + t;
      this.book.thumbnail = blobUrl;
    } else {
      this.book.thumbnail = book.thumbnail_url;
    }

    // this.getBase64ImageFromUrl('http://books.google.com/books/content?id=gsYxJSIRG…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api')
    // this.getBase64ImageFromUrl('https://httpbin.org/image/png')
    this.func()
      .then((result) => console.log('result', result))
      .catch((err) => console.error(err));
  }

  async getBase64ImageFromUrl(imageUrl: any) {
    var res = await fetch(imageUrl, { mode: 'no-cors' });
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }

  async func() {
    // const res = await fetch('http://books.google.com/books/content?id=gsYxJSIRGsMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',{mode: 'no-cors' });
    const res = await fetch('https://httpbin.org/image/png')
    console.log(res)
    const blob = await res.blob();
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    // newer promise based version of img.onload
    await img.decode();

    document.body.append(img);

    // Don't forget to revoke the blob url when
    // you no longer need it (to release memory)
    URL.revokeObjectURL(img.src);
  }

  getBook() {
    this.book.id = this.bookForm.value.id!;
    this.book.title = this.bookForm.value.title!;
    this.book.subtitle = this.bookForm.value.subtitle!;
    //this.book.authors = this.bookForm.value.authors;
    this.book.pages = this.bookForm.value.pages!;
    this.book.isbn_13 = this.bookForm.value.isbn_13!;
    this.book.thumbnail = this.bookForm.value.thumbnail!;
    this.book.release_dt = this.bookForm.value.release_dt!
    .split('/')
    .reverse()
    .join('-');


    console.log('release_dt',this.book.release_dt);
    this.book.thumbnail = this.b64Data;

    if (this.book.thumbnail == '/./assets/images/noImage.png') {
      this.book.thumbnail = null;
      this.book.thumbnail_url = null;
    } else if (this.b64Data === undefined) {
      //this.book.thumbnail_url = this.book.thumbnail;
      this.book.thumbnail = null;
    } else {
      console.log('this.b64Data', this.b64Data);
      this.book.thumbnail = this.b64Data;
    }
    console.log(this.book);
  }
}
