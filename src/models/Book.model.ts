import { PageModel } from "./Page.model";

export interface BookModel {
  title: string;
  author: string;
  pages: PageModel[];
}
