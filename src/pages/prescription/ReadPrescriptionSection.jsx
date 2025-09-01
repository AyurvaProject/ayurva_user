import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Chip } from "@mui/material";
import {
  GetPendingPrescriptionsByUserId,
  GetReadPrescriptionsByUserId,
} from "../../apis/prescription/Prescription";
import { useNavigate } from "react-router-dom";

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

const ReadPrescriptionSection = () => {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPendingPrescriptions = async () => {
      setLoading(true);
      const pendingPrescriptions = await GetReadPrescriptionsByUserId();
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

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "900px" }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Uploaded Date</TableCell>
            <TableCell align="left">Uploaded Time</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Active/Not</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row) => (
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
                  color={row?.pres_status === "pending" ? "warning" : "success"}
                  label={row?.pres_status === "pending" ? "PENDING" : "READED"}
                ></Chip>
              </TableCell>
              <TableCell align="center">
                <Chip
                  size="small"
                  variant="filled"
                  color={row?.pres_active_status ? "success" : "error"}
                  label={row?.pres_active_status ? "Active" : "Not Active"}
                ></Chip>
              </TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  disabled={!row?.pres_active_status}
                  onClick={() => navigate(`/prescription/${row?.id}`)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReadPrescriptionSection;
