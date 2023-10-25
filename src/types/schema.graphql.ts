export const typeDefs = `#graphql
  schema {
    query: RootQueryType
  }

  type PageContent {
    index: Int
    token: String
    content: String
    isTappable: Boolean
  }

  type Page {
    pageIndex: Int!
    pageContent: [PageContent!]!
  }

  type Book {
    title: String!
    author: String!
    pages: [Page!]!
  }

  type RootQueryType {
    fetchBooks(title: String, author: String): [Book!]!
  }
`;
