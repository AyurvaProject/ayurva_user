import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";
import { GetPendingPrescriptionsByUserId } from "../../apis/prescription/Prescription";

function createData(
  id,
  pres_uploaded_date,
  pres_uploaded_time,
  pres_status,
  pres_active_status
) {
  return {
    id,
    pres_uploaded_date,
    pres_uploaded_time,
    pres_status,
    pres_active_status,
  };
}

const PendingPrescriptionSection = () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    const fetchPendingPrescriptions = async () => {
      setLoading(true);
      const pendingPrescriptions = await GetPendingPrescriptionsByUserId();
      setRows(pendingPrescriptions);
      setLoading(false);
    };
    fetchPendingPrescriptions();
  }, []);

  console.log("rows", rows);

  const tableRows = rows.map((row) =>
    createData(
      row?.pres_id,
      row?.pres_uploaded_date,
      row?.pres_uploaded_time,
      row?.pres_status,
      row?.pres_active_status
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table
          sx={{ width: "900px" }}
          size="medium"
          aria-label="prescriptions table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Uploaded Date</TableCell>
              <TableCell align="left">Uploaded Time</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Active/Not</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.id}
                  </TableCell>
                  <TableCell align="left">{row?.pres_uploaded_date}</TableCell>
                  <TableCell align="left">{row?.pres_uploaded_time}</TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      variant="filled"
                      color={
                        row?.pres_status === "pending" ? "warning" : "success"
                      }
                      label={
                        row?.pres_status === "pending" ? "Pending" : "Done"
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      variant="filled"
                      color={row?.pres_active_status ? "success" : "error"}
                      label={row?.pres_active_status ? "Active" : "Not Active"}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={tableRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default PendingPrescriptionSection;
