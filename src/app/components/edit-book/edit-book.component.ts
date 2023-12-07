import { ProcessFile } from 'src/app/shared/processFile/processFile';
import Swal from 'sweetalert2';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
import { BooksService } from 'src/app/services/books.service';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, of, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ThemeService } from 'src/app/services/theme.service';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';
import { LocalService } from 'src/app/services/local.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit{
  public book: Book = new Book();
  public bookModal: Book = new Book();
  public bookListModal: Book[] = [];
  html_string: string = '';
  book_id: string = 'new';
  closeResult: string = ''; // TODO: retirar
  b64Data: any;
  localUrl: any;
  autorTeste: any; // TODO: retirar
  uploadCover: any;
  public isCollapsedThumbnail= true;
  isNew: boolean = true;
  user_id: string = this.localService.getUserId();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  themeCtrl = new FormControl();
  filteredThemes: Observable<any[]> = new Observable<any[]>();
  selectedThemes: any[] = [];
  allThemes: any[] = [];
  @ViewChild('themeInput') themeInput: ElementRef<HTMLInputElement> =
    {} as ElementRef;
  public isCollapsedTheme = true;

  authorCtrl = new FormControl();
  filteredAuthors: Observable<any[]> = new Observable<any[]>();
  selectedAuthors: any[] = [];
  allAuthors: any[] = [];
  @ViewChild('authorInput') authorInput: ElementRef<HTMLInputElement> =
    {} as ElementRef;
  public isCollapsed = true;

  selectedFile!: File;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  public bookForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl(''),
    authors: new FormControl<Author[]>([]),
    publisher: new FormControl('', [Validators.required]),
    thumbnail: new FormControl(''),
    isbn_13: new FormControl('', [Validators.required]),
    release_dt: new FormControl('', [Validators.required]),
    pages: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookService: BooksService,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private googleService: GoogleBooksService,
    private themeService: ThemeService,
    private authorService: AuthorService,
    private localService: LocalService,
    private location: Location,
  ) {
    this.filteredThemes = this.themeCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.allThemes.slice();
      })
    );
    this.filteredAuthors = this.authorCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this._filterAuthor(name as string)
          : this.allAuthors.slice();
      })
    );
  }

  ngOnInit(): void {
    this.book.thumbnail = '/./assets/images/noImage.png';
    this.themeService.getAll().subscribe((response: any) => {
      this.allThemes = response;
    });
    this.authorService.getAll().subscribe((response: any) => {
      this.allAuthors = response;
    });
    this.activatedRoute.params.subscribe((params) => {
      if(params['id'] != 'new'){
        this.bookService.getById(params['id']).subscribe((response: any) => {
          this.book_id = params['id'];
          this.isNew = false;
          this.loadBook(response);

          this.setBook();
        });
      }
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
      release_dt: this.book.release_dt,
      pages: this.book.pages,
      description: this.book.description,
      isbn_13: this.book.isbn_13,
    });
    this.selectedThemes = [];
    this.selectedThemes = this.book.themes;
    this.selectedAuthors = [];
    this.selectedAuthors = this.book.authors;

    console.log(this.book);
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
  get isbn_13() {
    return this.bookForm.get('isbn_13');
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  save() {
    console.log('form **3333** ', this.bookForm);
    if(this.bookForm.invalid)
      return;

    this.getBook();

    if (this.isNew) {
      this.bookService.add(this.book).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          });
          //this.router.navigate(['/booklovers/explorer/']);
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
      this.bookService.update(this.book).subscribe(
        (response) => {
          Swal.fire({
            title: 'Salvo',
            text: 'Registro salvo com sucesso',
            icon: 'success',
            timer: 2000,
          }).then(() => {
            this.location.back();
            // this.router.navigate(['/booklovers/detail-book/', this.book_id]);
          });
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
    this.location.back();
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

  loadByAPIGoogle(response: any) {
    this.book.title = response.volumeInfo.title;
    const sub_string = [];
    sub_string[0] = response.volumeInfo.industryIdentifiers[1].identifier.substr(0,3)
    sub_string[1] = response.volumeInfo.industryIdentifiers[1].identifier.substr(3)
    this.book.isbn_13 = sub_string.join('-');
    this.book.pages = this.handleUndefined(response.volumeInfo.pageCount);
    this.book.release_dt = response.volumeInfo.publishedDate
      .split('-')
      .reverse()
      .join('/');
    this.book.authors = [];
    if (response.volumeInfo.authors.length > 0) {
      response.volumeInfo.authors.forEach((element) => {
        this.book.authors.push({ id: null, name: element });
      });
    }
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
    console.log("qqqqq", book)
    this.book.id = book.id;
    this.book.title = book.title;
    this.book.publisher = book.publisher;
    this.book.description = book.description;
    this.book.pages = book.pages;
    this.book.release_dt = book.release_dt;
    const sub_string = [];
    sub_string[0] = book.isbn_13.substring(0,3);
    sub_string[1] = book.isbn_13.substring(3);
    this.book.isbn_13 = sub_string.join("-");
    this.book.themes = book.Themes;
    this.book.release_dt = book.release_dt.split('-').reverse().join('/');

    this.book.authors = book.Authors;

    if (book.thumbnail === null) {
      this.book.thumbnail = '/./assets/images/noImage.png';
    } else {
      this.book.thumbnail = book.thumbnail;
    }
  }

  getBook() {
    console.log(this.bookForm.value.id!)
    this.book.id = this.bookForm.value.id!;
    console.log(this.bookForm.value.title!)
    console.log(this.bookForm.value.title!.toLowerCase())
    this.book.title = this.bookForm.value.title!.toLowerCase();
    this.book.subtitle = this.bookForm.value.subtitle!.toLowerCase();
    this.book.publisher = this.bookForm.value.publisher!.toLowerCase();
    //this.book.authors = this.bookForm.value.authors;
    this.book.pages = this.bookForm.value.pages!;
    console.log(this.bookForm.value.isbn_13.indexOf("-") != -1)
    if(this.bookForm.value.isbn_13.indexOf("-") == -1){
      this.book.isbn_13 = this.bookForm.value.isbn_13!;
    } else{
      this.book.isbn_13 = this.bookForm.value.isbn_13!.replace("-", "");
    }
    this.book.thumbnail = this.bookForm.value.thumbnail!;
    if(this.book.thumbnail == '')
      this.book.thumbnail = null;
    this.book.release_dt = this.bookForm.value
      .release_dt!.split('/')
      .reverse()
      .join('-');

    console.log('save **** ', this.book);
  }

  open(content: any) {
    if (!this.bookForm.value.title) return;

    const t = this.bookForm.value.title!.split(' ').join('%');
    this.googleService.getAllByTitle(t).subscribe((response: any) => {
      this.loadListGoogle(response);
    });

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log(this.bookModal);
        },
        (reason) => {
          this.closeResult = `Dismissed`;
        }
      );
  }

  loadListGoogle(books: any) {
    var list: any[] = [];
    this.bookListModal = [];

    list = books.items;

    list.forEach((element) => {
      var bookAux = new Book();
      // ToDo:retirar
      bookAux.id = element.selfLink;
      // ToDo: voltar essa implementação do id
      //bookAux.id = element.volumeInfo.industryIdentifiers[0].identifier;

      bookAux.title = element.volumeInfo.title.toLowerCase();
      if (element.volumeInfo.authors.length > 0) {
        element.volumeInfo.authors.forEach((element) => {
          bookAux.authors.push({ id: null, name: element });
        });
      }

      bookAux.publisher =
        element.volumeInfo.publisher == undefined
          ? 'Editora não cadastrado'
          : element.volumeInfo.publisher.toString().toLowerCase();

      if (element.volumeInfo.imageLinks == undefined)
        bookAux.thumbnail = '/./assets/images/noImage.png';
      else bookAux.thumbnail = element.volumeInfo.imageLinks?.thumbnail;

      console.log(element.volumeInfo.imageLinks);
      //  ToDo: retirar
      // const rndInt = this.randomIntFromInterval(1, 5);
      // bookAux.rating = rndInt;
      // const rndIntb = this.randomIntFromInterval(0, 1);
      // bookAux.favorite = rndIntb;

      bookAux.description = element.volumeInfo.description;

      // ToDo: retirar - fim
      this.bookListModal.push(bookAux);
    });
  }

  selectedInfo(id: string) {
    this.googleService.getById(id).subscribe((response: any) => {
      this.loadByAPIGoogle(response);
      this.setBook();
      this.modalService.dismissAll();
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.selectedThemes.push({ id: null, name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.themeCtrl.setValue(null);
    console.log(this.selectedThemes);
  }

  remove(fruit: string): void {
    const index = this.selectedThemes.indexOf(fruit);

    if (index >= 0) {
      this.selectedThemes.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedThemes.push(event.option.value);
    this.themeInput.nativeElement.value = '';
    this.themeCtrl.setValue(null);
    console.log(this.selectedThemes);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allThemes.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  isThemeSelected(theme: any): boolean {
    const e = this.selectedThemes.find((t) => t.name == theme.name);
    if (e) return true;
    else return false;
  }

  addAuthor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.selectedAuthors.push({ id: null, name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.authorCtrl.setValue(null);
    // console.log(this.selectedThemes)
  }

  removeAuthor(author: string): void {
    const index = this.selectedAuthors.indexOf(author);

    if (index >= 0) {
      this.selectedAuthors.splice(index, 1);
    }
  }

  selectedAuthor(event: MatAutocompleteSelectedEvent): void {
    this.selectedAuthors.push(event.option.value);
    this.authorInput.nativeElement.value = '';
    this.authorCtrl.setValue(null);
  }

  private _filterAuthor(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAuthors.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFnAuthor(author: any): string {
    return author && author.name ? author.name : '';
  }

  isAuthorSelected(author: any): boolean {
    const e = this.selectedAuthors.find((t) => t.name == author.name);
    if (e) return true;
    else return false;
  }

  clickUploadCover() {
    this.book.thumbnail = this.uploadCover;
    console.log('imagemmmm', this.book.thumbnail);
    this.bookForm.controls['thumbnail'].setValue(this.uploadCover);
    this.uploadCover = '';
  }
}
