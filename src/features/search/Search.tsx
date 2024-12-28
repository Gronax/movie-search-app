import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { searchByTitle } from "./searchApi";
import { setSearchTitle, setSearchType } from "./searchSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import useDebounce from "../../hooks/useDebounce";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { SearchType } from "../../types/search";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

export default function Search() {
  const { title, page, type, year, data } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useAppDispatch();
  const debouncedSearchTerm = useDebounce(title, 500);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: SearchType
  ) => {
    dispatch(setSearchType(newType));
  };

  useEffect(() => {
    dispatch(searchByTitle({ title: debouncedSearchTerm, page, type, year }));
  }, [debouncedSearchTerm, page]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={4}>
          <TextField
            name="search-input"
            label="Search"
            variant="outlined"
            fullWidth
            margin="dense"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setSearchTitle(event.target.value));
            }}
          />
        </Grid>
        <Grid size={4}>
          <ToggleButtonGroup
            color="primary"
            value={type}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="movie">Movie</ToggleButton>
            <ToggleButton value="series">Series</ToggleButton>
            <ToggleButton value="episode">Episode</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid size={4}>
          <TextField
            name="search-input"
            label="Year"
            variant="outlined"
            type="number"
            margin="dense"
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data?.map((movie) => (
          <Grid key={movie.imdbID} size={{ xs: 2, sm: 4, md: 4 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea LinkComponent={Link} href={`/${movie.imdbID}`}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {movie.Title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {movie.Year}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {movie.imdbID}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
