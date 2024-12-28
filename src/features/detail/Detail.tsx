import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import { useParams } from "react-router";
import { useGetMovieDetailByIdQuery } from "../../services/detail";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Detail() {
  const params = useParams();
  const {
    data: movie,
    isFetching,
    error,
  } = useGetMovieDetailByIdQuery(params?.imdbID as string);

  if (isFetching) {
    return  <LoadingSpinner />;
  }

  if (error) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Stack>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        minHeight: "100vh",
      }}
    >
      <IconButton aria-label="back" LinkComponent={Link} href="/" size="large">
        <ArrowBackIcon />
      </IconButton>
      <Paper elevation={3} sx={{ padding: 4, flex: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h3">{movie?.Title}</Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="h5">{movie?.Year}</Typography>
              {movie?.Director !== "N/A" && (
                <Typography variant="h6" color="text.secondary">
                  <i>Directed by {movie?.Director}</i>
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <img
              src={movie?.Poster}
              alt={movie?.Title}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
            <Grid size={12}>
              <Typography variant="body1" align="center" color="text.secondary">
                {movie?.Rated} &bull; {movie?.Runtime} &bull; {movie?.Genre}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            size={{ xs: 12, md: 9 }}
            container
            spacing={2}
            direction="column"
          >
            <Typography variant="body1">{movie?.Plot}</Typography>
            <Typography variant="body1">
              <strong>Writer:</strong> {movie?.Writer}
            </Typography>
            <Typography variant="body1">
              <strong>Cast:</strong> {movie?.Actors}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="body1">
                <strong>Language:</strong> {movie?.Language}
              </Typography>
              <Typography variant="body1">
                <strong>Country:</strong> {movie?.Country}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="body1">
                <strong>IMDB Rating:</strong> {movie?.imdbRating}/10
              </Typography>
              {movie?.Ratings.map((rating) => (
                <Typography key={rating.Source} variant="body1">
                  <strong>{rating.Source}:</strong> {rating.Value}
                </Typography>
              ))}
            </Stack>
            <Typography variant="body1">
              <strong>Awards:</strong> {movie?.Awards}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
