import { FavoriteBorder, ShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useNavigate } from "react-router";
import StarRatings from "react-star-ratings";
import { useTranslation } from "../../../contexts/LanguageContext";

const QuoteBtn = styled(Button)({
  borderRadius: 8,
  backgroundColor: "#009444",
  padding: "0px 8px",
  height: "30px",
  border: "none",
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: 6,
  flex: 1,
  fontSize: 8,
  "&:hover": {
    backgroundColor: "#006222",
  },
});

const ItemCard = ({ product }) => {
  const navigate = useNavigate();
  const { translate } = useTranslation();

  return (
    <>
      <Box
        border={"1px solid #f5f5f5"}
        borderRadius={4}
        padding={2}
        width={220}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box height={"150px"} width={"200px"}>
          <img
            src={product?.image}
            alt={product?.title}
            height={"100%"}
            width={"100%"}
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Box>
          <Box
            width={"100%"}
            flex={1}
            display={"flex"}
            alignItems={"center"}
            gap={1}
          >
            <StarRatings
              rating={product?.rating}
              starRatedColor="#FFBD00"
              changeRating={() => {}}
              numberOfStars={5}
              starDimension="14px"
              name={`rating-${product?.id}`}
              starSpacing="0px"
            />
            <Typography fontSize={8} color={"#666"}>
              ({product?.numReviews})
            </Typography>
          </Box>
          <Box>
            <Typography textAlign={"left"} fontSize={12}>
              {product?.title}
            </Typography>
            <Box display={"flex"} alignItems={"center"} mt={1} gap={1}>
              <Typography fontSize={12}>${product?.price}</Typography>
              <Typography fontSize={12} color={"primary"} fontWeight={"600"}>
                {product?.discountedPrice ? `$${product?.discountedPrice}` : ""}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"} mt={1} gap={1}>
              <Box
                height={30}
                width={30}
                borderRadius={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                backgroundColor="#e4e7e9"
              >
                <FavoriteBorder fontSize="12px" />
              </Box>
              <QuoteBtn onClick={() => navigate("offers")}>
                {translate("productlistng.get")}
              </QuoteBtn>
              <Box
                height={30}
                width={30}
                borderRadius={2}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                backgroundColor="#e4e7e9"
              >
                <ShoppingCartOutlined fontSize="12px" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ItemCard;
