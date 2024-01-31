import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
  Box,
  Button,
  Icon,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../assets/style.css";

const AllowancesAndDeductionsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const previousData = location.state ? location.state.formData : {};

  const [focusStates, setFocusStates] = useState({
    residentAllowance: false,
    approvedDonations: false,
    studentLoanInterest: false,
    propertyInsurance: false,
    healthInsurance: false,
  });

  const [formData, setFormData] = useState({
    residentAllowance: previousData?.residentAllowance || 30000,
    approvedDonations: previousData?.approvedDonations || "",
    studentLoanInterest: previousData?.studentLoanInterest || "",
    propertyInsurance: previousData?.propertyInsurance || "",
    healthInsurance: previousData?.healthInsurance || "",
  });

  const prevPage = () => {
    navigate("/income-details", {
      state: { formData: { ...previousData, ...formData } },
    });
  };

  const nextPage = (e) => {
    e.preventDefault();
    navigate("/allowance-details-2", {
      state: { formData: { ...previousData, ...formData } },
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
        Allowances & Deductions
      </Typography>
      <form onSubmit={nextPage}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="residentAllowance"
                shrink={
                  focusStates.residentAllowance ||
                  formData.residentAllowance !== ""
                }
              >
                Resident Allowance
              </InputLabel>
              <OutlinedInput
                id="residentAllowance"
                label="residentAllowance"
                name="residentAllowance"
                value={formData.residentAllowance}
                onChange={handleInputChange("residentAllowance")}
                onFocus={() => handleFocusChange("residentAllowance")(true)}
                onBlur={() => handleFocusChange("residentAllowance")(false)}
                startAdornment={
                  focusStates.residentAllowance && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
            <Typography variant="caption">
              Allowance for Resident Individuals
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="a"
                shrink={
                  focusStates.approvedDonations ||
                  formData.approvedDonations !== ""
                }
              >
                Approved Donations
              </InputLabel>
              <OutlinedInput
                id="approvedDonations"
                label="approvedDonations"
                name="approvedDonations"
                value={formData.approvedDonations}
                onChange={handleInputChange("approvedDonations")}
                onFocus={() => handleFocusChange("approvedDonations")(true)}
                onBlur={() => handleFocusChange("approvedDonations")(false)}
                startAdornment={
                  focusStates.approvedDonations && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
            <Typography variant="caption">Include receipts</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="studentLoanInterest"
                shrink={
                  focusStates.studentLoanInterest ||
                  formData.studentLoanInterest !== ""
                }
              >
                Student Loan Interest
              </InputLabel>
              <OutlinedInput
                id="studentLoanInterest"
                label="studentLoanInterest"
                name="studentLoanInterest"
                value={formData.studentLoanInterest}
                onChange={handleInputChange("studentLoanInterest")}
                onFocus={() => handleFocusChange("studentLoanInterest")(true)}
                onBlur={() => handleFocusChange("studentLoanInterest")(false)}
                startAdornment={
                  focusStates.studentLoanInterest && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
            <Typography variant="caption">Include Statements</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="propertyInsurance"
                shrink={
                  focusStates.propertyInsurance ||
                  formData.propertyInsurance !== ""
                }
              >
                Property Insurance
              </InputLabel>
              <OutlinedInput
                id="propertyInsurance"
                label="propertyInsurance"
                name="propertyInsurance"
                value={formData.propertyInsurance}
                onChange={handleInputChange("propertyInsurance")}
                onFocus={() => handleFocusChange("propertyInsurance")(true)}
                onBlur={() => handleFocusChange("propertyInsurance")(false)}
                startAdornment={
                  focusStates.propertyInsurance && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
            <Typography variant="caption">Include Statements</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="healthInsurance"
                shrink={
                  focusStates.healthInsurance || formData.healthInsurance !== ""
                }
              >
                Health Insurance
              </InputLabel>
              <OutlinedInput
                id="healthInsurance"
                label="healthInsurance"
                name="healthInsurance"
                value={formData.healthInsurance}
                onChange={handleInputChange("healthInsurance")}
                onFocus={() => handleFocusChange("healthInsurance")(true)}
                onBlur={() => handleFocusChange("healthInsurance")(false)}
                startAdornment={
                  focusStates.healthInsurance && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
            <Typography variant="caption">Include Statements</Typography>
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

export default AllowancesAndDeductionsForm;
