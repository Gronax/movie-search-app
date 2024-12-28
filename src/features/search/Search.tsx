import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { searchByTitle } from "./searchApi";
import {
  setSearchTitle,
  setSearchType,
  setViewType,
  setYear,
} from "./searchSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import useDebounce from "../../hooks/useDebounce";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { SearchType, ViewType } from "../../types/search";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import LoadingSpinner from "../../components/LoadingSpinner";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ListView from "../../components/ListView";
import TableView from "../../components/TableView";

export default function Search() {
  const {
    title,
    page,
    type,
    year,
    loading,
    viewType,
    data: { Search: movies },
  } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const debouncedSearchTerm = useDebounce(title, 500);
  const debouncedYear = useDebounce(Number(year), 500);

  useEffect(() => {
    dispatch(
      searchByTitle({
        title: debouncedSearchTerm as string,
        page,
        type,
        year: debouncedYear as number,
      })
    );
  }, [debouncedSearchTerm, page, type, debouncedYear, dispatch]);

  const handleSearchType = (
    _event: React.MouseEvent<HTMLElement>,
    newType: SearchType
  ) => {
    dispatch(setSearchType(newType));
  };

  const handleViewType = (
    _event: React.MouseEvent<HTMLElement>,
    newType: ViewType
  ) => {
    if (newType !== null) {
      dispatch(setViewType(newType));
    }
  };

  const RenderResult = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (!movies) {
      return (
        <Typography variant="h6" color="text.secondary" align="center">
          No results found
        </Typography>
      );
    }

    return viewType === "list" ? <ListView /> : <TableView />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            name="search-input"
            label="Search"
            variant="outlined"
            fullWidth
            margin="dense"
            autoFocus
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setSearchTitle(event.target.value));
            }}
          />
        </Grid>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={type}
            exclusive
            onChange={handleSearchType}
            aria-label="Platform"
          >
            <ToggleButton value="movie">Movie</ToggleButton>
            <ToggleButton value="series">Series</ToggleButton>
            <ToggleButton value="episode">Episode</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            name="year-input"
            label="Year"
            variant="outlined"
            type="number"
            fullWidth
            margin="dense"
            value={year}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setYear(+event.target.value));
            }}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <RenderResult />
      <ToggleButtonGroup
        value={viewType}
        orientation="vertical"
        exclusive
        onChange={handleViewType}
        aria-label="view"
        size="large"
        sx={{ position: "fixed", top: 16, right: 16 }}
      >
        <Tooltip title="List View" placement="left">
          <ToggleButton value="list" aria-label="list view">
            <ViewModuleIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Table View" placement="left">
          <ToggleButton value="table" aria-label="table view">
            <ViewListIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Container>
  );
}
