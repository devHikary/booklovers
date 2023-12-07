import { Tag } from "./Tag";

export class Annotation{
  id: string | null = null;
  user_id: string = "";
  book_id: string = "";
  pages_read: number = 0;
  progress: number = 0;
  rating: number = 0;
  review: string = "";
  date_start: string = "";
  date_end: string = "";
  favorite: number = 0;
  tags: Tag[] = [];
}
