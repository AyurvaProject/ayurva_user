import React from "react";
import OrderCard from "../../components/order/OrderCard";
import { GetOrdersByUserId } from "../../apis/order/Order";
import { Box } from "@mui/material";
const OrdersListSection = ({ status }) => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOrders = async () => {
      const orders = await GetOrdersByUserId(status);
      setOrders(orders);
      setLoading(false);
    };
    fetchOrders();
  }, [status]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Box>
  );
};

export default OrdersListSection;
