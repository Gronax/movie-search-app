import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SearchState } from "../../types/search";

const initialState: SearchState = {
  loading: false,
  title: "",
  page: 1,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchTitle } = searchSlice.actions;

export default searchSlice.reducer;
