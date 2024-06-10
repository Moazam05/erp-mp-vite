import { useEffect, useState } from "react";
import { styled } from "@mui/system";

// MUI Components Import
import { Box, Grid, Typography, Button } from "@mui/material";

// Components Import
import AddressModal from "../../Modals/AddressModal";
import AddressCard from "./AddressCard";
import axios from "axios";
import { useTranslation } from "../../../../contexts/LanguageContext";
import { baseUrl } from "../../../../constants/api";

function Addresses() {
  const { translate } = useTranslation();

  const token = window.localStorage.getItem("mp-user-token");

  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingAddress, setEditingAddress] = useState([]);

  const [address, setAddress] = useState([]);

  const openModalWithAddID = (address) => {
    setEditingAddress(address);
    setAddressModalOpen(true);
    setIsUpdating(true);
  };

  const deleteAddress = (addID) => {
    axios
      .delete(`${baseUrl}/api/addresses/${addID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("Deleted", response);
        fetchUserAddresses();
      })
      .catch((error) => console.log("Error", error));
  };

  const fetchUserAddresses = () => {
    axios
      .get(`${baseUrl}/api/addresses`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setAddress(response.data);
      })
      .catch((error) => console.log("Error", error));
  };

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <>
      <Wrapper>
        <AddressModal
          open={addressModalOpen}
          setOpen={setAddressModalOpen}
          fetchUserAddresses={fetchUserAddresses}
          editingAddress={editingAddress}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
        />
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item md={3}>
            <CardHeading>{translate("address.book")}</CardHeading>
          </Grid>
          <Grid item md={9} display={"flex"} justifyContent={"end"}>
            {/* <Button onClick={() => {setAddressModalOpen(true); setEditingAddress(null) }}>{translate("address.add")}</Button> */}
            <Button onClick={() => setAddressModalOpen(true)}>
              {translate("address.add")}
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Card item md={12}>
            {address.length === 0 ? (
              <Typography>{translate("address.your")}</Typography>
            ) : (
              address.map((item, index) => (
                <AddressCard
                  key={index}
                  openModalWithAddID={openModalWithAddID}
                  data={item}
                  deleteAddress={deleteAddress}
                />
              ))
            )}
          </Card>
        </Grid>
      </Wrapper>
    </>
  );
}

// Styled Components

const Wrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}));

const Card = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  flexWrap: "wrap",
  background: "#fff",
  border: "1px solid #DDDDDD",
  width: "100%",
}));

const CardHeading = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 2px ",
}));

export default Addresses;
