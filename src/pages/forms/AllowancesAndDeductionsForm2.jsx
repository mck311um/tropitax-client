import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../../assets/style.css";

const AllowancesAndDeductionsForms = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const previousData = location.state ? location.state.formData : {};

  const [currentDate, setCurrentDate] = useState(null);

  const [focusStates, setFocusStates] = useState({
    firstMortgageInterest: false,
    secondMortgageInterest: false,
    payeDeductions: false,
    amountPaidOnFiling: false,
  });

  const [formData, setFormData] = useState({
    firstMortgageInterest: previousData.firstMortgageInterest || "",
    secondMortgageInterest: previousData.secondMortgageInterest || "",
    payeDeductions: previousData.payeDeductions || "",
    amountPaidOnFiling: previousData.amountPaidOnFiling || "",
    healthInsurance: previousData.healthInsurance || "",
  });

  const prevPage = () => {
    navigate("/allowance-details", {
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

  const calculateValues = async (e) => {
    e.preventDefault();
    setCurrentDate(new Date());
    const data = { ...previousData, ...formData };
    const {
      filingYear,
      wagesFromEmployment,
      allowableEmploymentDeductions,
      exemptIncome,
      residentAllowance,
      firstMortgageInterest,
      secondMortgageInterest,
      approvedDonations,
      studentLoanInterest,
      propertyInsurance,
      healthInsurance,
      amountPaidOnFiling,
      payeDeductions,
      paymentOnAccount,
      personId,
    } = data;

    try {
      const response = await axios.post("/values/calculate-values", {
        filingYear,
        wagesFromEmployment: Number(wagesFromEmployment),
        allowableEmploymentDeductions: Number(allowableEmploymentDeductions),
        exemptIncome: Number(exemptIncome),
        residentAllowance: Number(residentAllowance),
        filingDate: currentDate,
        firstMortgageInterest: Number(firstMortgageInterest),
        secondMortgageInterest: Number(secondMortgageInterest),
        approvedDonations: Number(approvedDonations),
        studentLoanInterest: Number(studentLoanInterest),
        propertyInsurance: Number(propertyInsurance),
        healthInsurance: Number(healthInsurance),
        amountPaidOnFiling: Number(amountPaidOnFiling),
        payeDeductions: Number(payeDeductions),
        paymentOnAccount: Number(paymentOnAccount),
        personId,
      });
      const responseData = response.data;
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        toast.success("Values Updated, PIT Form can now be filled");
        navigate("/")
      }
    } catch (error) {}
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
      <form onSubmit={calculateValues}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="firstMortgageInterest"
                shrink={
                  focusStates.firstMortgageInterest ||
                  formData.firstMortgageInterest !== ""
                }
              >
                1st Mortgage Interests
              </InputLabel>
              <OutlinedInput
                id="firstMortgageInterest"
                label="firstMortgageInterest"
                name="firstMortgageInterest"
                value={formData.firstMortgageInterest}
                onChange={handleInputChange("firstMortgageInterest")}
                onFocus={() => handleFocusChange("firstMortgageInterest")(true)}
                onBlur={() => handleFocusChange("firstMortgageInterest")(false)}
                startAdornment={
                  focusStates.firstMortgageInterest && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
            <Typography variant="caption" sx={{ fontSize: "1rem" }}>
              Maximum allowable $30,000.00 - Include statement
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="secondMortgageInterest"
                shrink={
                  focusStates.secondMortgageInterest ||
                  formData.secondMortgageInterest !== ""
                }
              >
                Second Mortgage Interest
              </InputLabel>
              <OutlinedInput
                id="secondMortgageInterest"
                label="secondMortgageInterest"
                name="secondMortgageInterest"
                value={formData.secondMortgageInterest}
                onChange={handleInputChange("secondMortgageInterest")}
                onFocus={() =>
                  handleFocusChange("secondMortgageInterest")(true)
                }
                onBlur={() =>
                  handleFocusChange("secondMortgageInterest")(false)
                }
                startAdornment={
                  focusStates.secondMortgageInterest && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
            <Typography variant="caption" sx={{ fontSize: "1rem" }}>
              Maximum allowable $15,000.00 - Include statement
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="payeDeductions"
                shrink={
                  focusStates.payeDeductions || formData.payeDeductions !== ""
                }
              >
                PAYE Deductions
              </InputLabel>
              <OutlinedInput
                id="payeDeductions"
                label="payeDeductions"
                name="payeDeductions"
                value={formData.payeDeductions}
                onChange={handleInputChange("payeDeductions")}
                onFocus={() => handleFocusChange("payeDeductions")(true)}
                onBlur={() => handleFocusChange("payeDeductions")(false)}
                startAdornment={
                  focusStates.payeDeductions && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
            <Typography
              variant="caption"
              sx={{
                fontSize: "1rem",
                opacity: "0.7",
                textDecoration: "italic",
              }}
            >
              Payments made on Tax Account
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="amountPaidOnFiling"
                shrink={
                  focusStates.amountPaidOnFiling ||
                  formData.amountPaidOnFiling !== ""
                }
              >
                Amount Paid on Filing
              </InputLabel>
              <OutlinedInput
                id="amountPaidOnFiling"
                label="amountPaidOnFiling"
                name="amountPaidOnFiling"
                value={formData.amountPaidOnFiling}
                onChange={handleInputChange("amountPaidOnFiling")}
                onFocus={() => handleFocusChange("amountPaidOnFiling")(true)}
                onBlur={() => handleFocusChange("amountPaidOnFiling")(false)}
                startAdornment={
                  focusStates.amountPaidOnFiling && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
              />
            </FormControl>
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

export default AllowancesAndDeductionsForms;
