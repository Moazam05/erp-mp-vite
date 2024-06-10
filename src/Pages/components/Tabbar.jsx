import { useState } from "react";
// Import the  MUI
import { styled, Box, Typography, Button, Rating } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import the MUI Icons
import Workspace from "@mui/icons-material/WorkspacePremium";
import Electric from "@mui/icons-material/ElectricRickshaw";
import Handshake from "@mui/icons-material/Handshake";
import Headphones from "@mui/icons-material/Headphones";
import Payment from "@mui/icons-material/Payment";
import { useTranslation } from "../../contexts/LanguageContext";
import AddReviewModal from "./Modals/AddReviewModal";

const Tabbar = ({ data, reviews }) => {
  const { translate, getLanguage, getDirection } = useTranslation();
  const language = getLanguage();

  const [addReviewModalOpen, setaddReviewModalOpen] = useState(false);
  const [value, setValue] = useState("1");
  // const [loading, setLoading] = useState();
  // const token = window.localStorage.getItem("mp-user-token");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const reviews = [
  //     {
  //        name: "David Gonzaley" ,
  //        detail: "My dog absolutely loves Acana Heritage Meats Dry Dog Food! Not only does it keep him energized and healthy, but I also appreciate the high-quality ingredients used. With real meats like beef, pork, and lamb as the first ingredients, I feel confident that my furry friend is getting the nutrition he needs. Plus, it's grain-free, which is great for his sensitive stomach. Highly recommend"
  //     },
  //     {
  //         name: "David Gonzaley" ,
  //         detail: "My dog absolutely loves Acana Heritage Meats Dry Dog Food! Not only does it keep him energized and healthy, but I also appreciate the high-quality ingredients used. With real meats like beef, pork, and lamb as the first ingredients, I feel confident that my furry friend is getting the nutrition he needs. Plus, it's grain-free, which is great for his sensitive stomach. Highly recommend"
  //      }

  // ];

  // const { prodId } = useParams()
  // console.log("prodId", prodId)

  // const fetchReviewMP = (prodId) => {
  //     setLoading(true);
  //     axios.get(`${baseUrl}/api/ratings/${prodId}`,
  //      {
  //         headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Token ${token}`,
  //         },
  //     })
  //     .then((response) => {
  //         console.log("prodId response", response.data);
  //         setReviews(response.data);
  //         setLoading(false);
  //     })
  //     .catch((error) => {
  //         console.error("Error fetching reviews details:", error);
  //         setLoading(false);
  //     });
  // }
  // useEffect(() => {
  //     fetchReviewMP(prodId);
  // }, []);

  return (
    <Box sx={{ width: "100%", typography: "body1" }} dir={getDirection()}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TabList onChange={handleChange} aria-label="Labels">
            <Tab
              label={translate("productdetail.desc")}
              value="1"
              sx={{ "&.Mui-selected": { color: "#009444" } }}
            />
            <Tab
              label={translate("productdetail.review")}
              value="2"
              sx={{ "&.Mui-selected": { color: "#009444" } }}
            />
            <Tab
              label={translate("productdetail.service")}
              value="3"
              sx={{ "&.Mui-selected": { color: "#009444" } }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TableWrapper display={"flex"} flexDirection={"row"} gap={"30px"}>
            <Descriptionbox>
              <Typography style={{ textAlign: "justify" }}>
                {language === "ar"
                  ? data?.commons?.ar?.description
                  : data?.commons?.en?.description}
              </Typography>
            </Descriptionbox>

            <FeatureBox
              sx={{
                borderRight: language === "ar" ? "none" : "1px solid #E4E7E9",
                borderLeft: language === "ar" ? "1px solid #E4E7E9" : "none",
              }}
            >
              <Box padding={"5px"}>
                <Typography fontWeight={"bold"}>
                  {translate("productdetail.feature")}
                </Typography>
                <DetailBox>
                  <Workspace sx={{ color: "#009444" }} />
                  <Typography fontSize={"14px"}>
                    {translate("productdetail.year")}
                  </Typography>
                </DetailBox>
                <DetailBox>
                  <Electric sx={{ color: "#009444" }} />
                  <Typography fontSize={"14px"}>
                    {translate("productdetail.fast")}
                  </Typography>
                </DetailBox>
                <DetailBox>
                  <Handshake sx={{ color: "#009444" }} />
                  <Typography fontSize={"14px"}>
                    {translate("productdetail.back")}
                  </Typography>
                </DetailBox>
                <DetailBox>
                  <Headphones sx={{ color: "#009444" }} />
                  <Typography fontSize={"14px"}>
                    {translate("productdetail.support")}
                  </Typography>
                </DetailBox>
                <DetailBox>
                  <Payment sx={{ color: "#009444" }} />
                  <Typography fontSize={"14px"}>
                    {translate("productdetail.secure")}
                  </Typography>
                </DetailBox>
              </Box>
            </FeatureBox>
          </TableWrapper>
        </TabPanel>
        <TabPanel value="2">
          <AddReviewModal
            open={addReviewModalOpen}
            prodId={data?.prodId}
            setOpen={setaddReviewModalOpen}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Heading sx={{ fontSize: "30px" }}>Reviews</Heading>

            <Button
              onClick={() => setaddReviewModalOpen(true)}
              variant="contained"
              color="secondary"
              disableElevation
              sx={{
                height: "40px",
                width: "auto",
                mt: "23px",
                borderRadius: "5px",
              }}
            >
              Write a review
            </Button>
          </Box>
          {/* loading */}
          {false ? (
            <p>Loading reviews...</p>
          ) : (
            reviews.map((data, index) => (
              <ReviewBox key={index}>
                <Heading>{data?.rated_user.fullname}</Heading>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "4px",
                  }}
                >
                  {/* Assuming 'value' is a property in the review object */}
                  <Rating name="read-only" value={data?.rating} readOnly />
                </Box>
                <Detail>{data.comment}</Detail>
              </ReviewBox>
            ))
          )}
        </TabPanel>
        <TabPanel value="3">
          {language === "ar"
            ? data?.commons?.ar?.serviceTerms
            : data?.commons?.en?.serviceTerms}
        </TabPanel>
      </TabContext>
    </Box>
  );
};
const TableWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "30px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const Descriptionbox = styled(Box)(({ theme }) => ({
  width: "65%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginBottom: "1px solid black",
  },
}));
const FeatureBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "35%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    borderRight: "none",
    borderLeft: "none",
    borderTop: "1px solid #E4E7E9",
  },
}));
const DetailBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  marginTop: "10px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
  },
}));

const Heading = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "800",
}));
const ReviewBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
  padding: "15px 10px",
  gap: "10px",
}));
const Detail = styled(Typography)(() => ({
  fontSize: "17px",
  width: "90%",
  fontWeight: "300",
  color: "#6A6A6A",
}));

export default Tabbar;
