import { styled } from "@mui/material/styles";
import { useTranslation } from "../../contexts/LanguageContext";
// MUI Components Import
import { Box, FormControl, Select, MenuItem } from "@mui/material";
// Assets/Icons Import
import arabicIcon from "../../assets/ksa.webp";
import englishIcon from "../../assets/uk.webp";

function LanguageButton() {
  const { language, translate, changeLanguage, getLanguage } = useTranslation();
  const languageOptions = [
    {
      value: "en",
      label: (
        <>
          <img
            src={englishIcon}
            alt="language icon"
            style={{ width: "18px", height: "18px" }}
          />{" "}
          {translate("en")}
        </>
      ),
    },
    {
      value: "ar",
      label: (
        <>
          <img
            src={arabicIcon}
            alt="language icon"
            style={{ width: "18px", height: "18px" }}
          />{" "}
          {translate("ar")}
        </>
      ),
    },
  ];

  return (
    <Wrapper>
      <LanguageSelector>
        <FormControl variant="standard" fullWidth sx={{ minWidth: 100 }}>
          <LanguageDropdown
            disableUnderline={true}
            defaultValue={getLanguage()}
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            sx={{
              ".MuiSelect-icon": { color: "black" },
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px 12px",
                borderRadius: "4px",
                backgroundColor: "transparent",
                color: "black",
                cursor: "pointer",
              },
            }}
          >
            {languageOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </LanguageDropdown>
        </FormControl>
      </LanguageSelector>
    </Wrapper>
  );
}

// Styled Components

const Wrapper = styled(Box)(() => ({
  width: "40%",
  display: "flex",
  alignItems: "flex-start",
  // backgroundColor: "#009444",
}));

const LanguageSelector = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

const LanguageDropdown = styled(Select)({
  width: "100%",
  height: "auto",
  outline: "none",
  color: "#fff",
});
export default LanguageButton;
