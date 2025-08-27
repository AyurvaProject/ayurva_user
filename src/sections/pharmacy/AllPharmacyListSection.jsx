import React from "react";
import {
  GetNearPharmacyByUserId,
  GetAllPharmacies,
} from "../../apis/pharmacy/Pharmacy";
import PharmacyCard from "../../components/pharmacy/PharmacyCard";
import {
  Box,
  Typography,
  Divider,
  TablePagination,
  TextField,
} from "@mui/material";

const AllPharmacyListSection = () => {
  const [pharmacies, setPharmacies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const pharmacies = await GetAllPharmacies();
        setPharmacies(pharmacies);
      } catch (err) {
        console.error("Failed to fetch pharmacies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPharmacies();
  }, []);

  // Filter pharmacies based on search term
  const filteredPharmacies = pharmacies.filter((pharmacy) =>
    pharmacy.pharmacy_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ my: 4 }}>
      {/* Header with title and search bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>
          All Pharmacies
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search pharmacy..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "40%" }}
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Typography>Loading...</Typography>
      ) : filteredPharmacies.length === 0 ? (
        <Typography>No pharmacies found.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
          }}
        >
          {filteredPharmacies
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((pharmacy) => (
              <Box key={pharmacy.id} sx={{ mb: 2 }}>
                <PharmacyCard pharmacy={pharmacy} />
              </Box>
            ))}

          {/* Pagination */}
        </Box>
      )}
      <TablePagination
        component="div"
        count={filteredPharmacies.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default AllPharmacyListSection;
