import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MovieListResponse, SearchState, SearchType, ViewType } from "../../types/search";
import { searchByTitle } from "./searchApi";

const initialState: SearchState = {
  loading: false,
  title: "pokemon",
  page: 1,
  data: {} as MovieListResponse,
  viewType: "list",
  year: '',
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setSearchType: (state, action: PayloadAction<SearchType>) => {
      state.type = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
    setViewType: (state, action: PayloadAction<ViewType>) => {
      state.viewType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchByTitle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchByTitle.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(searchByTitle.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setSearchTitle, setSearchType, setPage, setYear, setViewType } =
  searchSlice.actions;

export default searchSlice.reducer;
