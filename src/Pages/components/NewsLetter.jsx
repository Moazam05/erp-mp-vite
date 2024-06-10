import { styled } from "@mui/system";

// MUI Components Import
import { Box, Typography } from "@mui/material";

// MUI Icons Import
import { ArrowForward } from "@mui/icons-material";

// Assets Import
import GoogleImg from "../../assets/google.webp"
import AmazonImg from "../../assets/amazon.webp"
import ToshibaImg from "../../assets/toshiba.webp"
import SamsungImg from "../../assets/samsung.webp"
import PhilipsImg from "../../assets/philips.webp"

const NewsLetter = () => {
	return (
		<Box display={"flex"} gap={"20px"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}
			backgroundColor="#92278F" height={"390px"} marginTop={10}
		>
			<Typography color={"white"} fontWeight={"600"} fontSize={20}>Subscribe to our newsletter</Typography>
			<Box width={"550px"}>
				<Typography textAlign={"center"} fontWeight={"100"} color={"white"} fontSize={12}>
					Subscribe to our weekly newsletter to stay updated with our hot selling items, deals and promotions before others!
				</Typography>
			</Box>
			<InputBox>
				<InputEmail placeholder="Email Address" />
				<ScheduleBtn>
					SUBSCRIBE 
					<ArrowForward fontSize="10px" />{" "}
				</ScheduleBtn>
			</InputBox>
			<Divider/>
			<Box display={"flex"} gap={4} justifyContent={"center"} alignItems={"center"}>
				<Image src={GoogleImg} />
				<Image src={AmazonImg} />
				<Image src={PhilipsImg} />
				<Image src={ToshibaImg} />
				<Image src={SamsungImg} />
			</Box>
		</Box>
	);
};

// Styled Components

const InputBox = styled(Box)({
	width: 440,
	height: 46,
	padding: 8,
	backgroundColor: "white",
	borderRadius: 8,
	display: "flex",
	alignItems:"center",
	boxShadow:".2px .2px 2px 0px rgba(255,255,255,.4)"
});
const InputEmail = styled("input")({
	border:"none",
	fontSize:10,
	paddingLeft:6,
	flex: 1,
	"&:focus":{
		outline:"none"
	}
});

const ScheduleBtn = styled("button")({
	borderRadius: 20,
	backgroundColor: "#009444",
	padding: "10px 14px",
	border: "none",
	color: "white",
	display: "flex",
	alignItems: "center",
	gap: 6,
	fontSize:10,
	fontWeight:"500"
});

const Image = styled("img")({
	width:"60px",
	height:"auto",
	display:"inline-block"
})

const Divider = styled(Box)({
	width:300,
	height:.2,
	backgroundColor:"rgba(255,255,255,.2)"
})

export default NewsLetter;
