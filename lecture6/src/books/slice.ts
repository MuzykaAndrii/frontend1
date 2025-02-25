import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Book {
    name: string;
    author: string;
}

interface BooksState {
    books: Book[];
    loading: boolean;
    error: string | null;
}

const initialState: BooksState = {
    books: [],
    loading: false,
    error: null,
};

const loadBooks = createAsyncThunk<Book[], void>(
    "books/loadBooks",
    async () => {
        return new Promise<Book[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    { name: "book1", author: "author1" },
                    { name: "book2", author: "author2" },
                    { name: "book3", author: "author3" },
                    { name: "book4", author: "author4" },
                    { name: "book5", author: "author5" },
                ]);
            }, 1000);
        });
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook(state, action: PayloadAction<Book>) {
            state.books.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(loadBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load books";
            });
    }
});

export const { addBook } = booksSlice.actions;
export { loadBooks };
export default booksSlice.reducer;
