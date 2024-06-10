import PropTypes from "prop-types";

// Context Import
// import { useTranslation } from "../../contexts/LanguageContext";

// Import MUI components
import {
  styled,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

// Import Icons
import EventNoteIcon from "@mui/icons-material/EventNote";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HandshakeIcon from "@mui/icons-material/Handshake";

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <EventNoteIcon />,
    2: <Inventory2Icon />,
    3: <LocalShippingIcon />,
    4: <HandshakeIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ["Order Placed", "Accepted", "Dispatched", "Delivered"];

const Stepperstep = ({ orderStatus }) => {
  // const { getDirection } = useTranslation();

  // Determine active step based on orderStatus
  let activeStep = 1;

  switch (orderStatus) {
    case 1: // Order Placed
      activeStep = 1;
      break;
    case 2: // Rejected or Dispatched
      activeStep = 2;
      break;
    case 4: // Delivered
      activeStep = 3;
      break;
    case 5: // Delivered
      activeStep = 4;
      break;
    default:
      activeStep = 1; // Order Placed
  }

  return (
    <Grid container spacing={0} sx={{ width: "90%" }}>
      <Grid item xs={1} md={11}>
        {orderStatus === 3 ? (
          <Typography variant="body1" color="error">
            Your order has been rejected!
          </Typography>
        ) : (
          <Stepper
            // alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  icon={index + 1}
                  ownerState={{ index, activeStep }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0",
                    gap: "10px",
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </Grid>
    </Grid>
  );
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 24,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    borderRadius: 1,
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "black",
    },
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "grey",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === "dark" ? "black" : "grey",
    borderRadius: 1,
    marginBottom: 20,
  },
}));

const ColorlibStepIconRoot = styled("div")(
  ({ theme, ownerState, orderStatus }) => {
    const { completed, activeStep, index } = ownerState;
    const getColor = () => {
      if (orderStatus === 3) {
        return "none"; // Hide icon for rejected state
      } else if (completed) {
        return "#67C6E3"; // Completed color (blue)
      } else if (index === activeStep) {
        return "#FFF6A9"; // Current step color (red)
      } else {
        return theme.palette.mode === "dark" ? "grey" : "#ccc"; // Pending step color (light grey)
      }
    };

    return {
      backgroundColor: getColor(),
      zIndex: 1,
      color: completed || activeStep === index ? "black" : "#fff",
      width: 45,
      height: 45,
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
      ...(activeStep === index && {
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)", // Add a shadow for the current step
      }),
    };
  }
);

export default Stepperstep;
