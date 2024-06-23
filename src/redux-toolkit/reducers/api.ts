import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  callGetAPI,
  callGetPaginatedAPI,
  callPostAPI,
} from "../../services/api-services";
import { API_ENDPOINTS, IBooks, IPaginate } from "../../services/types";

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (params: IPaginate) => {
    const books = await callGetPaginatedAPI(
      API_ENDPOINTS.getAllBooks
        .replace("$page", params.page.toString())
        .replace("$limit", params.limit.toString())
    );
    return books;
  }
);

export const addNewBook = createAsyncThunk(
  "books/addNewBook",
  async (data: IBooks) => {
    const books = await callPostAPI(API_ENDPOINTS.saveNewBook, data);
    return books;
  }
);

// export const updateBook = createAsyncThunk('books/updateBook', async (updatedBook: Book) => {
//   // const response = await axios.put(`${API_URL}/${updatedBook.id}`, updatedBook);
//   // return response.data;
// });
// ?page=$page&limit=$limit
