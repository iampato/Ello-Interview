import { PageContent } from "./PageContent.model";
import { TokenModel } from "./Token.model";

export interface PageModel {
  pageIndex: number;
  content: string;
  pageContent: PageContent[];
  tokens: TokenModel[];
}
