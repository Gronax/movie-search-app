import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { setPage } from "../features/search/searchSlice";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

export default function ListView() {
  const {
    page,
    data: { Search: movies, totalResults },
  } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const pageCount = Math.ceil(parseInt(totalResults, 10) / 10) || 1;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(value));
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      alignItems="center"
      justifyContent="center"
    >
      {movies?.map((movie) => (
        <Grid key={movie.imdbID} size={{ xs: 12, md: 6, lg: 4 }}>
          <Card>
            <CardActionArea LinkComponent={Link} href={`/${movie.imdbID}`}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {movie.Title}
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  <strong>Release:</strong>&nbsp;{movie.Year}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <strong>IMDB ID:</strong>&nbsp;{movie.imdbID}
                  </Typography>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      <Grid
        size={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Pagination
          count={pageCount}
          page={page}
          size="large"
          onChange={handlePageChange}
        />
        <Typography variant="overline" color="text.secondary">
          {totalResults} results found
        </Typography>
      </Grid>
    </Grid>
  );
}
