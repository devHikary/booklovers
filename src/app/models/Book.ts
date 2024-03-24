
import { Annotation } from "./Annotation";
import { Author } from "./Author";
import { Theme } from "./Theme";

export class Book{
  id: string = "";
  title: string = "";
  subtitle: string = "";
  authors: Author[] = [];
  publisher: string = "";
  thumbnail: string | null = null;
  pages: string = "";
  release_dt: string = "";
  themes: Theme[] = [];
  description: string = "";
  isbn_13: string = "";

  annotation: Annotation = new Annotation();
  // page_read: number = 0;
  // progress: number = 0;
  // rating: number = 0;
  // review: string = "";
  // date_start: string = "";
  // date_end: string = "";
  // favorite: number = 0;

}
