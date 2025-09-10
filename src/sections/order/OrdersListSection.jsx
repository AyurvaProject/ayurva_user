import React from "react";
import OrderCard from "../../components/order/OrderCard";
import { GetOrdersByUserId } from "../../apis/order/Order";
import { Box, Pagination } from "@mui/material";
import LoadingSection from "../loading/LoadingSection";

const OrdersListSection = ({ status }) => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Pagination state
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const orders = await GetOrdersByUserId(status);
      setOrders(orders);
      setLoading(false);
    };
    fetchOrders();
  }, [status]);

  // Calculate total pages
  const pageCount = Math.ceil(orders.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box sx={{ width: "900px" }}>
        <LoadingSection />
      </Box>
    );
  }

  // Slice orders for current page
  const displayedOrders = orders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 0 }}
    >
      {displayedOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}

      {orders.length > rowsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default OrdersListSection;
