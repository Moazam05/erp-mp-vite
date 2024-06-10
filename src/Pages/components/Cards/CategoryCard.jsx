import { styled } from "@mui/system";
import { useNavigate } from 'react-router-dom';

// MUI Components Import
import { Box, Typography } from '@mui/material'

const CategoryCard = ({ image, title, id }) => {

    const navigate = useNavigate();
    
	return (
		<Card sx={{border: "none", background: `url(${image}) center/cover no-repeat`}} onClick={() => navigate(`/category/${id}`)}>
			<Heading>{title}</Heading>
		</Card>
	)
}

// Styled Components

const Card = styled(Box)(() => ({
    width: "150px",
    height: "140px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "5px",
    border: "1px solid #f5f5f5",
    cursor: "pointer"
}))

const Heading = styled(Typography)(() => ({
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff"
}))

export default CategoryCard