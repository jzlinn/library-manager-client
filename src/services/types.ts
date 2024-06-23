// src/types.ts
export interface IBooks {
  id: number;
  name: string;
  description: string;
  price: number;
  publisher: string;
  author: string;
  publishedOn?: Date | number;
}

export interface BooksState {
  books: IBooks[];
  loading: boolean;
  error: string | null;
  status: string;
}

export interface IPaginate {
  page: number;
  limit: number;
}

export const ROOT = "http://localhost:8008";

export const API_ENDPOINTS = {
  getAllBooks: "/api/library/get-all-books?page=$page&limit=$limit",
  saveNewBook: "/api/library/save-book/new",
  getBookByID: "/api/library/get-book/$bookID",
  updateBookByID: "/api/library/update-book/$bookID",
};
