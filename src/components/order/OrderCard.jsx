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

const OrderCard = ({ order }) => {
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
              Pharmacy: {order.pharmacist.pharmacist_name}
            </Typography>
            <Typography variant="body2">
              Pharmacist: {order.pharmacist.pharmacist_name}
            </Typography>
            <Chip
              label={order.order_pharmacy_status}
              color={
                order.order_pharmacy_status === "pending"
                  ? "warning"
                  : order.order_pharmacy_status === "accepted"
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
              Deliver By: {order?.delivery_person?.delivery_person_name}
            </Typography>
            <Typography variant="body2">
              Curier: {order?.delivery_person?.delivery_person_name}
            </Typography>
            <Chip
              label={order.order_delivery_status}
              color={
                order.order_delivery_status === "pending"
                  ? "warning"
                  : order.order_delivery_status === "accepted"
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
