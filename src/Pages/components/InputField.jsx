import { styled } from "@mui/material/styles";

// MUI Components Import

import { Typography, Select, MenuItem, Grid } from "@mui/material";

function InputField(props) {
  const { label, size, onChange } = props;

  return (
    <>
      <Wrapper item md={size} my={1}>
        <Label>{label}:</Label>
        <Input value={label} color="success" onChange={onChange} size="small">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Input>
      </Wrapper>
    </>
  );
}

// Styled Components

const Wrapper = styled(Grid)({
  display: "flex",
  flexDirection: "column",
});

const Label = styled(Typography)({
  fontSize: "12px",
  fontWeight: "500",
});
const Input = styled(Select)({
  marginTop: "5px",
  background: "#fff",
  borderRadius: "5px",
});

export default InputField;
