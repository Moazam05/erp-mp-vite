// import React from 'react'
// import { styled } from "@mui/system";

// // MUI Components Import
// import { Box, Typography, Button } from "@mui/material";

// // Assets Import
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import { useTranslation } from '../../../../contexts/LanguageContext';

// function AddressCard({ openModalWithAddID, data, deleteAddress }) {
//     const { translate, getDirection } = useTranslation();

//     const { fullname, phonenumber, address, city, country, address_label_display, is_billing, is_shipping } = data

//     return (
//         <>
//             <AddressBox dir={getDirection()} my={2}>
//                 <DetailBox>
//                     <Text>{fullname}</Text>
//                     <Text>{phonenumber}</Text>
//                     <Text> {address}, {city}, {country} </Text>
//                     <LabelsWrapper>
//                         <Label>{address_label_display}</Label>
//                         {is_billing ?
//                             <Label>{translate("address.default")}</Label>
//                             :
//                             null
//                         }
//                         {is_shipping ?
//                             <Label>{translate("address.ship")}</Label>
//                             :
//                             null
//                         }
//                     </LabelsWrapper>
//                 </DetailBox>
//                 <CTABox>
//                     <Edit variant='outlined' sx={{height:'20px'}} onClick={() => openModalWithAddID(data)}>{translate("address.edit")}</Edit>
//                     <DeleteIcon onClick={() => deleteAddress(data.addID)} sx={{cursor: "pointer", fontSize: "18px", color: "red"}} />
//                 </CTABox>
//             </AddressBox>
//         </>
//     )
// }

// const AddressBox = styled(Box)(({theme}) => ({
//     width: "40%",
//     height: "auto",
//     display:'flex',
//     flexDirection:'row',
//     padding: "20px",
//     background: "#fff",
//     border: "1px solid #e5e5e5",
//     borderRadius: "4px",
//     "&:hover": {
//         transition: "all .3s",
//         boxShadow: "0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017"
//     },
//     [theme.breakpoints.down('sm')]: {
//         width: "80%",
//     }
// }))

// const CTABox = styled(Box)(({theme}) => ({
//     display: "flex",
//     alignItems: "initial",
//     gap: "5px",
//     width:'20%',
//     [theme.breakpoints.down('sm')]: {
//         width: "30%",
//     }
// }))

// const DetailBox = styled(Box)(({theme}) => ({
//     width:'80%',
//     [theme.breakpoints.down('sm')]: {
//         width: "70%",
//     }
// }))

// const Edit = styled(Button)(() => ({
//     cursor: "pointer",
//     color: "#165fcf",
//     fontSize: "12px"
// }))

// const Text = styled(Typography)(() => ({
//     fontSize: "12px",
//     marginBottom: "8px"
// }))

// const LabelsWrapper = styled(Box)(() => ({
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     gap: "12px"
// }))

// const Label = styled(Box)(() => ({
//     fontSize: "10px",
//     background: "#f5f5f5",
//     color: "#000",
//     padding: "8px",
//     borderRadius: "5px"
// }))

// export default AddressCard

import { styled } from "@mui/system";

// MUI Components Import
import { Box, Typography, Button } from "@mui/material";

// Assets Import
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useTranslation } from "../../../../contexts/LanguageContext";

function AddressCard({ data, deleteAddress, openModalWithAddID }) {
  const { translate, getDirection } = useTranslation();

  const {
    fullname,
    phonenumber,
    address,
    city,
    country,
    address_label_display,
    is_billing,
    is_shipping,
  } = data;

  return (
    <>
      <AddressBox dir={getDirection()} my={2}>
        <DetailBox>
          <Text>{fullname}</Text>
          <Text>{phonenumber}</Text>
          <Text>
            {" "}
            {address}, {city}, {country}{" "}
          </Text>
          <LabelsWrapper>
            <Label>{address_label_display}</Label>
            {is_billing ? <Label>{translate("address.default")}</Label> : null}
            {is_shipping ? <Label>{translate("address.ship")}</Label> : null}
          </LabelsWrapper>
        </DetailBox>
        <CTABox>
          <Edit
            variant="outlined"
            sx={{ height: "20px" }}
            onClick={() => openModalWithAddID(data)}
          >
            {translate("address.edit")}
          </Edit>
          <DeleteIcon
            onClick={() => deleteAddress(data.addID)}
            sx={{ cursor: "pointer", fontSize: "18px", color: "red" }}
          />
        </CTABox>
      </AddressBox>
    </>
  );
}

const AddressBox = styled(Box)(({ theme }) => ({
  width: "60%",
  height: "auto",
  display: "flex",
  flexDirection: "row",
  padding: "20px",
  background: "#fff",
  border: "1px solid #e5e5e5",
  borderRadius: "4px",
  "&:hover": {
    transition: "all .3s",
    boxShadow:
      "0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017",
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
  },
}));

const CTABox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "initial",
  gap: "5px",
  width: "20%",
  [theme.breakpoints.down("sm")]: {
    width: "30%",
  },
}));

const DetailBox = styled(Box)(({ theme }) => ({
  width: "80%",
  [theme.breakpoints.down("sm")]: {
    width: "70%",
  },
}));

const Edit = styled(Button)(() => ({
  cursor: "pointer",
  color: "#165fcf",
  fontSize: "12px",
}));

const Text = styled(Typography)(() => ({
  fontSize: "12px",
  marginBottom: "8px",
}));

const LabelsWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "12px",
}));

const Label = styled(Box)(() => ({
  fontSize: "10px",
  background: "#f5f5f5",
  color: "#000",
  padding: "8px",
  borderRadius: "5px",
}));

export default AddressCard;
