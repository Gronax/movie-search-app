import * as React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { setPage } from "../features/search/searchSlice";
import { useNavigate } from "react-router";

export default function TableView() {
  const {
    page,
    data: { Search: movies, totalResults },
  } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // mui table is 0-based, but our paging logic is 1-based
    dispatch(setPage(newPage + 1));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>IMDB ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies?.map((movie) => (
              <TableRow
                key={movie.imdbID}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                hover
                onClick={() => navigate(`/${movie.imdbID}`)}
              >
                <TableCell component="th" scope="row">
                  {movie.imdbID}
                </TableCell>
                <TableCell>{movie.Title}</TableCell>
                <TableCell>{movie.Year}</TableCell>
                <TableCell>{movie.Type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={Number(totalResults)}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />
    </>
  );
}
