import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import searchReducer from "../features/search/searchSlice";
import { detailApi } from "../services/detail";

const store = configureStore({
  reducer: {
    search: searchReducer,
    [detailApi.reducerPath]: detailApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(detailApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)

export default store;