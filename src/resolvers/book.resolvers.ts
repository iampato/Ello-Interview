import { getBooks } from "../controllers/book.controller";
import { BookModel } from "../models/Book.model";

const resolvers = {
  RootQueryType: {
    fetchBooks: async (_: any, args: { title?: string; author?: string }): Promise<BookModel[]> => {
      const { title, author } = args;
      let fetchedBooks = await getBooks();

      if (title) {
        fetchedBooks = fetchedBooks.filter((book) => book.title === title);
      }

      if (author) {
        fetchedBooks = fetchedBooks.filter((book) => book.author === author);
      }

      return fetchedBooks;
    },
  },
};

export default resolvers;
