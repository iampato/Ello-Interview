import { BookModel } from "../models/Book.model";
import { readResourcesData } from "../utils/getData.util";
import { processContent } from "../utils/processTokens.util";

export const getBooks = async (): Promise<BookModel[]> => {
  try {
    // ideally this should be a database call
    // for the purpose of this interview, we will just read the data from the resources folder
    // as instructed in the README.md file
    const books = await readResourcesData();

    // we need to process book -> pages -> tokens here
    books.forEach((book) => {
      book.pages.forEach((page) => {
        const parsedContent = processContent(page.content, page.tokens);
        page.pageContent = parsedContent;
      });
    });

    return books;
  } catch (err) {
    console.error(`Error getting books: ${err}`);
    throw err;
  }
};
