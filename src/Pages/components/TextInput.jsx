import { styled } from "@mui/material/styles";

// MUI Components Import
import { Grid, TextField, Typography } from "@mui/material";

function TextInput(props) {
  const { label, size, value, onChange, type } = props;

  return (
    <>
      <Wrapper item md={size} my={1}>
        <Label>{label} :</Label>
        <Input
          type={type}
          size="small"
          color="success"
          variant="outlined"
          value={value}
          onChange={onChange}
        />
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

const Input = styled(TextField)({
  marginTop: "5px",
  background: "#fff",
  borderRadius: "5px",
});

export default TextInput;
