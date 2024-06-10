import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import axios from "axios";

// MUI Components Import
import {
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// import icons
import Shopping from "@mui/icons-material/ShoppingCart";
import Cancel from "@mui/icons-material/CancelOutlined";
import { useCart } from "../../../../contexts/CartContext";
import { baseUrl } from "../../../../constants/api";

function Wishlist() {
  const token = window.localStorage.getItem("mp-user-token");

  const { addToCart } = useCart();

  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchWishlistItems = () => {
    axios
      .get(`${baseUrl}/api/wishlist`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("Wishlist Items", response.data);
        setWishlistItems(response.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const removeWishlistItem = (id) => {
    axios
      .delete(`${baseUrl}/api/wishlist/${id}/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        setWishlistItems([]);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    console.log("Adding item from Wishlist", item);
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  return (
    <>
      <Wrapper>
        <Grid container>
          <CardHeading>Wishlist</CardHeading>
          <Card item md={12}>
            <TableWrapper component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#DDDDDD" }}>
                  <TableRow>
                    <TableHeadings>Products</TableHeadings>
                    <TableHeadings>Price</TableHeadings>
                    <TableHeadings>Category</TableHeadings>
                    <TableHeadings>Actions</TableHeadings>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wishlistItems.length === 0 ? (
                    <TableRow align="center">
                      <TableContent colSpan={4} align="center">
                        No Items in your wishlist!
                      </TableContent>
                    </TableRow>
                  ) : (
                    wishlistItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableContent sx={{ width: "40%" }}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={item.product.images[0].image}
                              alt="product"
                              style={{
                                width: "45px",
                                height: "45px",
                                borderRadius: "15px",
                                marginRight: "8px",
                              }}
                            />
                            {item.product.productName}
                          </div>
                        </TableContent>
                        <TableContent
                          sx={{
                            fontWeight: "bold",
                            color: "black",
                            width: "15%",
                            fontSize: "16px",
                          }}
                        >
                          {item.product.vat_onlinePrice} SAR
                        </TableContent>
                        <TableContent
                          sx={{
                            fontWeight: "bold",
                            color: "black",
                            width: "15%",
                            fontSize: "16px",
                          }}
                        >
                          {item.product.productCategory} /{" "}
                          {item.product.productSubcategory}
                        </TableContent>
                        <TableContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "30px",
                            }}
                          >
                            <Button
                              size="small"
                              style={{
                                textTransform: "none",
                                padding: "4px 40px",
                              }}
                              color="secondary"
                              variant="contained"
                              sx={{
                                width: "180px",
                                backgroundColor:
                                  index === 3 ? "#ADB7BC" : "secondary.main",
                              }}
                              endIcon={<Shopping />}
                              onClick={() => handleAddToCart(item.product)}
                            >
                              Add to Cart
                            </Button>
                            <Cancel
                              sx={{ color: "#929FA5", cursor: "pointer" }}
                              onClick={() => removeWishlistItem(item.wishId)}
                            />
                          </Box>
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

// Styled Components

const Wrapper = styled(Box)({
  width: "100%",
  margin: "10px",
});

const Card = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
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
}));

const TableContent = styled(TableCell)(() => ({
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "16px",
  color: "#71747D",
  border: "none",
}));

export default Wishlist;
