import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BooksState, IBooks, API_ENDPOINTS } from "../../services/types";
import { addNewBook, getBooks } from "./api";

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
  status: "pending",
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action: PayloadAction<IBooks[]>) => {
        state.loading = false;
        state.books = action.payload;
        state.status = 'success';
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch books";
      })
      // .addCase() addNewBook
      .addCase(addNewBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addNewBook.fulfilled,
        (state, action: PayloadAction<IBooks[]>) => {
          state.loading = false;
          state.books = action.payload;
        }
      )
      .addCase(addNewBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch books";
      });
  },
});

export default booksSlice.reducer;
