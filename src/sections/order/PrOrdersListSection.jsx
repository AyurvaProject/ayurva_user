import React from "react";
import OrderCard from "../../components/order/OrderCard";
import PrOrderCard from "../../components/order/PrOrderCard";
import { GetPrescriptionOrdersByUserId } from "../../apis/prescriptionOrder/PrescriptionOrder";
import { Box } from "@mui/material";
import LoadingSection from "../loading/LoadingSection";
const PrOrdersListSection = ({ status }) => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOrders = async () => {
      const orders = await GetPrescriptionOrdersByUserId(status);
      setOrders(orders);
      setLoading(false);
    };
    fetchOrders();
  }, [status]);

  if (loading) {
    return <LoadingSection />;
  }
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {orders.map((order) => (
        <PrOrderCard key={order.id} order={order} />
      ))}
    </Box>
  );
};

export default PrOrdersListSection;
