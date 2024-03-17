import {
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../assets/style.css";

const IncomeDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state ? location.state.formData : {};
  const personId = location.state ? location.state.personId : "";

  const currentYear = new Date().getFullYear();
  let years = [];

  for (let year = currentYear - 10; year <= currentYear + 0; year++) {
    years.push({ value: year, label: year });
  }

  const [focusStates, setFocusStates] = useState({
    wagesFromEmployment: false,
    allowableEmploymentDeductions: false,
    exemptIncome: false,
  });

  const [formData, setFormData] = useState({
    personId: personId,
    filingYear: data?.filingYear || currentYear,
    wagesFromEmployment: data?.wagesFromEmployment || "",
    allowableEmploymentDeductions: data?.allowableEmploymentDeductions || "",
    exemptIncome: data?.exemptIncome || "",
  });

  const prevPage = () => {
    navigate("/contact-details", { state: { ...data, ...formData } });
  };

  const nextPage = (e) => {
    e.preventDefault();
    navigate("/allowance-details", {
      state: { formData: { personId, ...data, ...formData } },
    });
  };

  const handleFocusChange = (field) => (isFocused) => {
    setFocusStates((prevStates) => ({
      ...prevStates,
      [field]: isFocused,
    }));
  };

  const handleInputChange = (name) => (e) => {
    const value = e.target ? e.target.value : e;
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };

      return newData;
    });
  };
  return (
    <Box
      sx={{
        marginTop: "50px",
        margin: "auto",
        width: "60%",
        bgcolor: "rgba(240, 240, 240, 0.5)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        backdropFilter: "blur(10px)",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography id="form-title" variant="h3" component="h3">
        Income Details
      </Typography>
      <form onSubmit={nextPage}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="filingYear">Filing Year</InputLabel>
              <Select
                labelId="filingYear"
                name="filingYear"
                id="filingYear"
                label="filingYear"
                value={formData.filingYear}
                onChange={handleInputChange("filingYear")}
              >
                {years.slice().map((el) => (
                  <MenuItem key={el.value} value={el.value}>
                    {el.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="wagesFromEmployment"
                shrink={
                  focusStates.wagesFromEmployment ||
                  formData.wagesFromEmployment !== ""
                }
              >
                Wages From Employment
              </InputLabel>
              <OutlinedInput
                id="wagesFromEmployment"
                label="wagesFromEmployment"
                name="wagesFromEmployment"
                value={formData.wagesFromEmployment}
                onChange={handleInputChange("wagesFromEmployment")}
                onFocus={() => handleFocusChange("wagesFromEmployment")(true)}
                onBlur={() => handleFocusChange("wagesFromEmployment")(false)}
                startAdornment={
                  focusStates.wagesFromEmployment && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
            <Typography variant="caption">
              Annual salary before Deductions
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="allowableEmploymentDeductions"
                shrink={
                  focusStates.allowableEmploymentDeductions ||
                  formData.allowableEmploymentDeductions !== ""
                }
              >
                Allowable Employment Deductions
              </InputLabel>
              <OutlinedInput
                id="allowableEmploymentDeductions"
                label="allowableEmploymentDeductions"
                name="allowableEmploymentDeductions"
                value={formData.allowableEmploymentDeductions}
                onChange={handleInputChange("allowableEmploymentDeductions")}
                onFocus={() =>
                  handleFocusChange("allowableEmploymentDeductions")(true)
                }
                onBlur={() =>
                  handleFocusChange("allowableEmploymentDeductions")(false)
                }
                startAdornment={
                  focusStates.allowableEmploymentDeductions && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
            <Typography variant="caption">
              Expenses incurred wholly, exclusively and necessarily in the
              production of Assessable Income
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="exemptIncome"
                shrink={
                  focusStates.exemptIncome || formData.exemptIncome !== ""
                }
              >
                Exempt Income
              </InputLabel>
              <OutlinedInput
                id="exemptIncome"
                label="exemptIncome"
                name="exemptIncome"
                value={formData.exemptIncome}
                onChange={handleInputChange("exemptIncome")}
                onFocus={() => handleFocusChange("exemptIncome")(true)}
                onBlur={() => handleFocusChange("exemptIncome")(false)}
                startAdornment={
                  focusStates.exemptIncome && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
            <Typography variant="caption">
              Sickness/Maternity Benefit refunded by Social Security to your
              employer
            </Typography>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Button
            type="button"
            variant="contained"
            color="error"
            size="large"
            onClick={prevPage}
            startIcon={<Icon as={ArrowBackIcon} />}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            endIcon={<Icon as={ArrowForwardIcon} />}
          >
            Next
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default IncomeDetailsForm;
