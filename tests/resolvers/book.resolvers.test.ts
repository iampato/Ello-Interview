import resolvers from "../../src/resolvers/book.resolvers";
import { BookModel } from "../../src/models/Book.model";

describe("fetchBooks", () => {
  it("should return an array of books", async () => {
    // Create a mock getBooks function that returns an array of books
    const mockGetBooks = jest.fn(() =>
      Promise.resolve([
        {
          title: "The Lord of the Rings",
          author: "J.R.R. Tolkien",
          pages: [],
        },
        {
          title: "The Hitchhiker's Guide to the Galaxy",
          author: "Douglas Adams",
          pages: [],
        },
      ])
    );

    // Set the getBooks function on the resolvers object to the mock getBooks function
    resolvers.RootQueryType.fetchBooks = mockGetBooks;

    // Call the fetchBooks resolver
    const books = await resolvers.RootQueryType.fetchBooks(undefined, {});

    // Expect the fetchBooks resolver to return the array of books
    expect(books).toEqual([
      {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        pages: [],
      },
      {
        title: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
        pages: [],
      },
    ]);
  });
});
