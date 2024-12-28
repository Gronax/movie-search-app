import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SearchState, SearchType } from "../../types/search";
import { searchByTitle } from "./searchApi";

const initialState: SearchState = {
  loading: false,
  title: "pokemon",
  page: 1,
  data: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(searchByTitle.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { setSearchTitle, setSearchType } = searchSlice.actions;

export default searchSlice.reducer;
