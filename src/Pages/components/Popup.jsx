// MUI Components Import
import { Box, Typography, Modal, CardMedia } from "@mui/material";

// Component Styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
};

const imageStyle = {
  width: "52px",
  height: "52px",
  margin: "0 auto",
};

const Popup = ({ title, desc, img, open, setOpen }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CardMedia component="img" image={img} sx={imageStyle} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {desc}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Popup;
