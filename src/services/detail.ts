import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from "../types/search";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const detailApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getMovieDetailById: builder.query<Movie, string>({
      query: (imdbID: string) => `?apikey=${API_KEY}&plot=full&i=${imdbID}`,
    }),
  }),
});

export const { useGetMovieDetailByIdQuery } = detailApi;
