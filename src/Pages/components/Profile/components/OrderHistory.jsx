import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// MUI Components Import
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";

// Loader Import
import Loader from "../../Loader";

// Icons Import
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

// React Toastify Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "../../../../contexts/LanguageContext";
import { baseUrl } from "../../../../constants/api";

const statusColor = {
  1: "#BCFFB6",
  2: "#add8e6",
  3: "#FF0000",
  4: "#FFF6A9",
  5: "#67C6E3",
};

function OrderHistory() {
  const { translate, getDirection } = useTranslation();

  const token = window.localStorage.getItem("mp-user-token");

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, isLoading] = useState(false);

  const fetchOrderHistory = () => {
    isLoading(true);
    axios
      .get(`${baseUrl}/api/orders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setOrders(response.data);
        isLoading(false);
      })
      .catch((err) => {
        console.log("Error", err);
        isLoading(false);
      });
  };

  const downloadInvoice = (id) => {
    isLoading(true);
    axios
      .get(`${baseUrl}/api/invoice/${id}`, {
        responseType: "blob", // Set the response type to blob to handle binary data
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        toast.success("Invoice PDF Downloaded!");
        isLoading(false);
      })
      .catch((error) => {
        toast.error("Error downloading Invoice!");
        console.log("Error", error);
        isLoading(false);
      });
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <>
      <Wrapper dir={getDirection()}>
        <Grid container>
          <CardHeading>{translate("order-history.history")}</CardHeading>
          <Card item md={12}>
            <TableWrapper component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#DDDDDD" }}>
                  <TableRow>
                    <TableHeadings>#</TableHeadings>
                    <TableHeadings>
                      {translate("order-history.id")}
                    </TableHeadings>
                    <TableHeadings>
                      {translate("order-history.status")}
                    </TableHeadings>
                    <TableHeadings>
                      {translate("order-history.at")}
                    </TableHeadings>
                    <TableHeadings>
                      {translate("order-history.price")}
                    </TableHeadings>
                    <TableHeadings>Transaction ID</TableHeadings>
                    <TableHeadings>Payment Method</TableHeadings>
                    <TableHeadings>Payment Status</TableHeadings>
                    <TableHeadings>
                      {translate("order-history.action")}
                    </TableHeadings>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <Loader />
                  ) : orders.length === 0 ? (
                    <TableRow align="center">
                      <TableContent colSpan={6} align="center">
                        {translate("order-history.not")}
                      </TableContent>
                    </TableRow>
                  ) : (
                    orders.map((item, index) => (
                      <TableRow key={index}>
                        <TableContent>{index + 1}</TableContent>
                        <TableContent>{item?.order?.ordId}</TableContent>
                        <TableContent>
                          <Box
                            sx={{
                              width: "100px",
                              height: "30px",
                              color: "#000",
                              backgroundColor: `${
                                statusColor[String(item?.order?.status)]
                              }`,
                              display: "flex",
                              alignContent: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50px",
                              fontSize: "12px",
                              fontWeight: "bold",
                              margin: "0 auto",
                            }}
                          >
                            {item?.order?.status_display}
                          </Box>
                        </TableContent>
                        <TableContent>
                          {new Date(item?.order?.created_at).toLocaleString()}
                        </TableContent>
                        <TableContent>
                          {parseFloat(
                            item.order.total_price || 0
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          SAR
                        </TableContent>
                        <TableContent>
                          {item.order.transaction.fort_id}
                        </TableContent>
                        <TableContent>
                          {item.order.transaction.payment_method_display}
                        </TableContent>
                        <TableContent sx={{ fontWeight: "bolder" }}>
                          {item.order.transaction.payment_status === 1 ? (
                            <Link
                              to={`/payment/${item.order.order_id}`}
                              style={{
                                textDecoration: "none",
                                color: "green",
                              }}
                            >
                              Pay Now
                            </Link>
                          ) : item.order.transaction.payment_status === 2 ? (
                            item.order.transaction.payment_status_display
                          ) : (
                            item.order.transaction.payment_status_display
                          )}
                        </TableContent>
                        <TableContent sx={{ width: "120px" }}>
                          <Tooltip
                            title={translate("order-history.view")}
                            placement="top"
                          >
                            <IconButton
                              color="primary"
                              onClick={() =>
                                navigate(
                                  `/profile/orderdetail/${item.order.order_id}`
                                )
                              }
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title={translate("order-history.invoice")}
                            placement="top"
                          >
                            <IconButton
                              color="primary"
                              onClick={() => downloadInvoice(item.order.ordId)}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                        </TableContent>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableWrapper>
          </Card>
        </Grid>
      </Wrapper>
    </>
  );
}

// Styled Component

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

const Card = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  background: "#fff",
  border: "1px solid #DDDDDD",
}));

const CardHeading = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 2px",
}));

const TableWrapper = styled(TableContainer)(() => ({
  height: "auto",
  overflow: "auto",
  border: "none",
  boxShadow: "none",
}));

const TableHeadings = styled(TableCell)(() => ({
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "16px",
  color: "black",
  background: "#F2F4F5",
  textAlign: "center",
}));

const TableContent = styled(TableCell)(() => ({
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "16px",
  color: "#71747D",
  border: "none",
  textAlign: "center",
}));

export default OrderHistory;
