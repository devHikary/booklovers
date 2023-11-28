export class Book{
  id: string = "";
  title: string = "";
  subtitle: string = "";
  authors: string = "";
  publisher: string = "";
  thumbnail: string | null | Blob = null;
  thumbnail_url: string | null = null;
  pages: string = "";
  release_dt: string = "";
  themes: string[] = [];
  description: string = "";


  rating: number = 0;
  isbn_13: string = "";
  favorite: number = 0;

}
