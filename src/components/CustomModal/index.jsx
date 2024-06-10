// React Imports
// MUI Imports
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  outline: "none",
  "@media (max-width: 576px)": {
    width: "90%",
  },
};

const CustomModal = ({ children, open, sx, setModalOpen }) => {
  return (
    <Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => {
          if (setModalOpen) {
            setModalOpen(false);
          }
        }}
      >
        <Box sx={{ ...style, ...sx }}>{children}</Box>
      </Modal>
    </Box>
  );
};

export default CustomModal;
