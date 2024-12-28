import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { MovieListResponse, SearchParam } from "../../types/search";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const searchByTitle = createAsyncThunk(
  "movies/searchByTitle",
  async (params: SearchParam) => {
    const res = await axios.get<MovieListResponse>(API_URL, {
      params: {
        apikey: API_KEY,
        s: params.title,
        page: params.page,
        ...(params.type && { type: params.type}),
        ...(params.year && { y: params.year}),
      },
    });
    return res.data;
  }
);
