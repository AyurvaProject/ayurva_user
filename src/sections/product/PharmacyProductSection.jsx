import React from "react";
import { GetNoPrescriptionProductsByPharmacyId } from "../../apis/products/Products";
import ProductCard from "../../components/product/ProductCard";
import {
  Box,
  Typography,
  Divider,
  TablePagination,
  TextField,
} from "@mui/material";

const PharmacyProductSection = ({ id }) => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await GetNoPrescriptionProductsByPharmacyId(id);
        setProducts(products);
      } catch (err) {
        console.error("Failed to fetch pharmacies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter pharmacies based on search term
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
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
          Products
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "40%" }}
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Typography>Loading...</Typography>
      ) : filteredProducts.length === 0 ? (
        <Typography>No products found.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
          }}
        >
          {filteredProducts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => (
              <Box key={product.product_id} sx={{ mb: 2 }}>
                <ProductCard product={product} />
              </Box>
            ))}

          {/* Pagination */}
        </Box>
      )}
      <TablePagination
        component="div"
        count={filteredProducts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[8, 16, 24]}
      />
    </Box>
  );
};

export default PharmacyProductSection;
