import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";

// MUI Components Import
import {
  Modal,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  ToggleButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// Loader Import
import { MoonLoader } from "react-spinners";
import { baseUrl } from "../../../constants/api";

// React Toastify Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "../../../contexts/LanguageContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  backgroundColor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

function AddressModal({
  open,
  setOpen,
  fetchUserAddresses,
  editingAddress,
  isUpdating,
  setIsUpdating,
}) {
  const { translate } = useTranslation();

  const token = window.localStorage.getItem("mp-user-token");

  const [saving, setSaving] = useState(false);

  const [billing, setBilling] = useState(false);
  const [shipping, setShipping] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
    city: "",
    country: "",
    address: "",
    landmark: "",
    address_label: 1,
    is_billing: false,
    is_shipping: false,
  });

  useEffect(() => {
    if (isUpdating) {
      setFormData({
        fullname: editingAddress.fullname || "",
        phonenumber: editingAddress.phonenumber || "",
        email: editingAddress.email || "",
        city: editingAddress.city || "",
        country: editingAddress.country || "",
        address: editingAddress.address || "",
        landmark: editingAddress.landmark || "",
        address_label: editingAddress.address_label || 1,
        address_type: editingAddress.address_type || [],
      });
    } else {
      setFormData({
        fullname: "",
        phonenumber: "",
        email: "",
        city: "",
        country: "",
        address: "",
        landmark: "",
        address_label: 1,
        address_type: [],
      });
    }
  }, [isUpdating, editingAddress]);

  const changeFormData = (key, value) => {
    if (key === "address_label") {
      setFormData({
        ...formData,
        [key]: value,
      });
    } else {
      setFormData({
        ...formData,
        [key]: value,
      });
    }
  };

  const addUserAddress = () => {
    formData.is_billing = billing;
    formData.is_shipping = shipping;
    setSaving(true);
    axios
      .post(`${baseUrl}/api/addresses/create`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        toast.success("Address added successfully!");
        setSaving(false);
        setOpen(false);
        fetchUserAddresses();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Address couldn't be added!");
        setSaving(false);
      });
  };

  const updateUserAddress = (id) => {
    formData.is_billing = billing;
    formData.is_shipping = shipping;
    setSaving(true);
    axios
      .put(`${baseUrl}/api/addresses/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        toast.success("Address updated successfully!");
        setSaving(false);
        setOpen(false);
        fetchUserAddresses();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Address couldn't be updated!");
        setSaving(false);
      });
  };

  const closeModal = () => {
    setOpen(false);
    setIsUpdating(false);
  };

  return (
    <>
      <Modal open={open} onClose={() => closeModal()}>
        <Box sx={style}>
          <Grid container>
            <Grid item md={3} textAlign={"start"}>
              <Heading sx={{ padding: "10px 0" }}>
                {isUpdating
                  ? translate("modal.update")
                  : translate("modal.add")}
              </Heading>
            </Grid>
            <Grid item md={12}>
              <AddressWrapper item xs={12} sm={12} md={12}>
                <AddressFields>
                  <Input
                    label={translate("modal.full")}
                    size="small"
                    type="text"
                    value={formData.fullname}
                    onChange={(e) => {
                      changeFormData("fullname", e.target.value);
                    }}
                  />
                  <Input
                    label={translate("modal.phone")}
                    size="small"
                    type="number"
                    value={formData.phonenumber}
                    onChange={(e) => {
                      changeFormData("phonenumber", e.target.value);
                    }}
                  />
                  <Input
                    label={translate("modal.email")}
                    size="small"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      changeFormData("email", e.target.value);
                    }}
                  />
                  <Input
                    label={translate("modal.city")}
                    size="small"
                    type="text"
                    value={formData.city}
                    onChange={(e) => {
                      changeFormData("city", e.target.value);
                    }}
                  />
                  <Input
                    label={translate("modal.country")}
                    size="small"
                    type="text"
                    value={formData.country}
                    onChange={(e) => {
                      changeFormData("country", e.target.value);
                    }}
                  />
                  <Input
                    label={translate("modal.address")}
                    size="small"
                    type="text"
                    value={formData.address}
                    onChange={(e) => {
                      changeFormData("address", e.target.value);
                    }}
                  />
                  <Input
                    label={translate("modal.land")}
                    size="small"
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => {
                      changeFormData("landmark", e.target.value);
                    }}
                  />
                </AddressFields>
                <LabelWrapper>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    my={2}
                    p={3}
                    sx={{ border: "1px solid #f5f5f5", textAlign: "start" }}
                  >
                    <Heading>{translate("modal.select")}</Heading>
                    <AddressLabel
                      selected={formData.address_label === 1}
                      onClick={() => changeFormData("address_label", 1)}
                    >
                      {translate("modal.home")}
                    </AddressLabel>
                    <AddressLabel
                      selected={formData.address_label === 2}
                      onClick={() => changeFormData("address_label", 2)}
                    >
                      {translate("modal.office")}
                    </AddressLabel>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    my={2}
                    p={3}
                    sx={{ border: "1px solid #f5f5f5", textAlign: "start" }}
                  >
                    <Heading>{translate("modal.optional")}</Heading>
                    <FormGroup>
                      <Billing item xs={12} sm={12} md={12}>
                        <Grid item xs={6} sm={12} md={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={billing}
                                onChange={(e) => setBilling(e.target.checked)}
                              />
                            }
                            label={translate("modal.billing")}
                          />
                        </Grid>
                        <Grid item xs={6} sm={12} md={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={shipping}
                                onChange={(e) => setShipping(e.target.checked)}
                              />
                            }
                            label={translate("modal.shipping")}
                          />
                        </Grid>
                      </Billing>
                      <Typography sx={{ fontSize: "10px", color: "gray" }}>
                        {translate("modal.your")}
                      </Typography>
                    </FormGroup>
                  </Grid>
                </LabelWrapper>
              </AddressWrapper>
            </Grid>
          </Grid>
          {isUpdating ? (
            <SaveBTN onClick={() => updateUserAddress(editingAddress.addID)}>
              {saving ? (
                <>
                  <MoonLoader color="#fff" size={20} />
                </>
              ) : (
                translate("modal.edit")
              )}
            </SaveBTN>
          ) : (
            <SaveBTN onClick={() => addUserAddress()}>
              {saving ? (
                <>
                  <MoonLoader color="#fff" size={20} />
                </>
              ) : (
                translate("modal.save")
              )}
            </SaveBTN>
          )}
        </Box>
      </Modal>
    </>
  );
}

// Styled Components

const Input = styled(TextField)({
  background: "#fff",
  borderRadius: "5px",
});

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "17px",
  fontWeight: "500",
  color: "#000",
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
  },
}));

const SaveBTN = styled(Button)(() => ({
  width: "150px",
  height: "40px",
  margin: "0 auto",
  background: "#009444",
  color: "#fff",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#009444",
  },
}));

const Billing = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
  },
}));

const AddressWrapper = styled(Grid)(({ theme }) => ({
  padding: "10px",
  border: "1px solid #E4E7E9",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "row",
  gap: "18px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "9px",
  },
}));

const AddressFields = styled(Grid)(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const LabelWrapper = styled(Grid)(({ theme }) => ({
  width: "50%",
  height: "auto",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const AddressLabel = styled(ToggleButton)(({ theme }) => ({
  width: "20%",
  height: "auto",
  border: "1px solid #009444",
  color: "#009444",
  background: "#fff",
  padding: "8px",
  cursor: "pointer",
  margin: "12px",
  fontSize: "16px",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#009444",
  },
  [theme.breakpoints.down("md")]: {
    width: "15%",
    padding: "6px",
    fontSize: "13px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "15%",
    margin: "4px",
    padding: "5px",
    fontSize: "10px",
  },
}));

export default AddressModal;
