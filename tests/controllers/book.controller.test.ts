// Stub implementation of the readResourcesData function
const stubReadResourcesData = jest.fn(() =>
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

describe("getBooks", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return an array of books", async () => {
    // Set the stub implementation as the readResourcesData function
    jest.doMock("../../src/utils/getData.util", () => ({
      readResourcesData: stubReadResourcesData,
    }));

    // Import the getBooks function from the jest.mocked object
    const { getBooks } = await import("../../src/controllers/book.controller");

    // Call the getBooks function
    const books = await getBooks();

    // Expect the getBooks function to return the array of books
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
  // it("should throw an error if there is an error reading the data", async () => {
  //   // Set the stub implementation as the readResourcesData function to throw an error
  //   jest.doMock("../../src/utils/getData.util", () => ({
  //     readResourcesData: jest.fn(() =>
  //       Promise.reject(new Error("Error reading data"))
  //     ),
  //   }));

  //   // Import the getBooks function from the jest.mocked object
  //   const { getBooks } = await import("../../src/controllers/book.controller");

  //   // Expect the getBooks function to throw an error
  //   expect(async () => await getBooks()).rejects.toThrow("Error reading data");
  // });

  // it("should return an empty array if there are no books in the resources directory", async () => {
  //   // Set the stub implementation as the readResourcesData function to return an empty array
  //   jest.doMock("../../src/utils/getData.util", () => ({
  //     readResourcesData: jest.fn(() => Promise.resolve([])),
  //   }));

  //   // Import the getBooks function from the jest.mocked object
  //   const { getBooks } = await import("../../src/controllers/book.controller");

  //   // Call the getBooks function
  //   const books = await getBooks();

  //   // Expect the getBooks function to return an empty array
  //   expect(books).toEqual([]);
  // });
});
