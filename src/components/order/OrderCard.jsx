import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GetPharmacyByPharmacistId } from "../../apis/pharmacy/Pharmacy";
import { GetDeliveryOrgById } from "../../apis/deliveryOrg/DeliveryOrg";
import { useState, useEffect } from "react";

const OrderCard = ({ order }) => {
  const [pharmacy, setPharmacy] = useState(null);
  const [deliveryOrg, setDeliveryOrg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPharmacy = async () => {
      setLoading(true);
      const pharmacyData = await GetPharmacyByPharmacistId(order.pharmacist_id);
      setPharmacy(pharmacyData);
      setLoading(false);
    };
    fetchPharmacy();
  }, [order.pharmacist_id]);

  useEffect(() => {
    const fetchDeliveryOrg = async () => {
      if (order.deliveryperson) {
        setLoading(true);
        const deliveryOrgData = await GetDeliveryOrgById(
          order.deliveryperson.delivery_org_id
        );
        setDeliveryOrg(deliveryOrgData);
        setLoading(false);
      }
    };
    fetchDeliveryOrg();
  }, [order.deliveryperson]);
  console.log(order);
  return (
    <Accordion sx={{ width: "900px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src={order.product.product_img1}
            alt={order.product.product_name}
            style={{ width: "50px" }}
          />
          <Typography variant="body1">{order.product.product_name}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
          }}
        >
          <Paper sx={{ p: 1 }}>
            <Typography variant="body1">Order Details</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">Order ID: {order.order_id}</Typography>
            <Typography variant="body2">
              Order Date: {order.order_date}
            </Typography>
            <Typography variant="body2">
              Order Time: {order.order_time}
            </Typography>
            <Typography variant="body2">Quantity: {order.quantity}</Typography>
          </Paper>
          <Paper sx={{ p: 1 }}>
            <Typography variant="body1">Pharmacy Details</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">
              Pharmacy: {loading ? "Loading..." : pharmacy?.pharmacy_name}
            </Typography>
            <Typography variant="body2">
              Pharmacist: {order.pharmacist.pharmacist_name}
            </Typography>
            <Typography variant="body2">
              Contact: {loading ? "Loading..." : pharmacy?.pharmacy_contact_01}
            </Typography>
            <Chip
              label={
                order.order_pharmacy_status === "pending"
                  ? "Pending"
                  : order.order_pharmacy_status === "accepted"
                  ? "Accepted"
                  : order.order_pharmacy_status === "completed"
                  ? "Completed"
                  : "Rejected"
              }
              color={
                order.order_pharmacy_status === "pending"
                  ? "warning"
                  : order.order_pharmacy_status === "accepted"
                  ? "info"
                  : order.order_pharmacy_status === "completed"
                  ? "success"
                  : "error"
              }
              size="small"
              sx={{ mt: 1 }}
            />
          </Paper>
          <Paper sx={{ p: 1 }}>
            <Typography variant="body1">Delivery Details</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">
              Deliver By:{" "}
              {loading ? "Loading..." : deliveryOrg?.delivery_org_name}
            </Typography>
            <Typography variant="body2">
              Curier: {order?.deliveryperson?.delivery_person_name}
            </Typography>
            <Chip
              label={
                order.order_delivery_status === "pending"
                  ? "Pending"
                  : order.order_delivery_status === "accepted"
                  ? "Accepted"
                  : order.order_delivery_status === "completed"
                  ? "Completed"
                  : "Pending"
              }
              color={
                order.order_delivery_status === "pending"
                  ? "warning"
                  : order.order_delivery_status === "accepted"
                  ? "info"
                  : order.order_delivery_status === "completed"
                  ? "success"
                  : "error"
              }
              size="small"
              sx={{ mt: 1 }}
            />
          </Paper>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderCard;
