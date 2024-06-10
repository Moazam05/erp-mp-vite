import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const SelectInputSearch = ({
  name,
  options,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled,
}) => {
  return (
    <>
      <Autocomplete
        disablePortal
        name={name}
        disabled={disabled}
        options={options || []}
        fullWidth
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        sx={{
          "& .MuiAutocomplete-inputRoot": {
            borderRadius: "4px",
            background: "#fff",
            height: "40px",
          },
          "& .MuiFormHelperText-root": {
            marginLeft: "2px !important",
          },
          "& .MuiOutlinedInput-input": {
            padding: "0.5px 4px 0.5px 5px !important",
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "14px",
          },
        }}
        getOptionLabel={(option) => option.name || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label=""
            error={error}
            helperText={helperText}
            placeholder={placeholder || "Select City"}
          />
        )}
      />
    </>
  );
};

export default SelectInputSearch;
