import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Movie } from "../../types/search";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/?apikey=${API_KEY}` }),
  endpoints: (builder) => ({
    getMovieByIdOrTitle: builder.query<Movie, string>({
      query: (title) => `title/${title}`,
    }),
  }),
});

export const { useGetMovieByIdOrTitleQuery } = searchApi;
