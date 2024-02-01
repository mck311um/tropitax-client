import { maritalStatuses, nationalities } from "../../assets/data";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Icon,
  Stack,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-hot-toast";
import "../../assets/style.css";

const PersonalDetailsForm = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const data = location.state ? location.state.formData : {};

  const [formData, setFormData] = useState({
    firstName: data?.firstName || "",
    middleName: data?.middleName || "",
    lastName: data?.lastName || "",
    tin: data?.tin || "",
    ssn: data?.ssn || "",
    nationality: data?.nationality || "",
    sex: data?.sex || "",
    maritalStatus: data?.maritalStatus || "",
    spouseName: data?.spouseName || "",
    dateOfBirth: data?.dateOfBirth || "",
  });

  const nextPage = (e) => {
    e.preventDefault();

    if (formData.firstName === "") {
      toast.error("First Name is required");
    } else if (formData.lastName === "") {
      toast.error("Last Name is required");
    } else if (formData.ssn === "") {
      toast.error("Social Security Number is required");
    } else if (formData.ssn.lenth < 13) {
      toast.error("Social Security Number is invalid");
    } else if (formData.nationality === "") {
      toast.error("Nationality is required");
    } else if (formData.sex === "") {
      toast.error("Sex is required");
    } else if (formData.maritalStatus === "") {
      toast.error("Marital Status is required");
    } else if (
      formData.maritalStatus !== "Single" &&
      formData.spouseName === ""
    ) {
      toast.error("Spouse Name is required");
    } else if (formData.tin.length < 5 || formData.tin.length > 8) {
      toast.error("Taxpayer Number should be a 5-8 digit number");
    } else {
      navigate("/contact-details", { state: { formData } });
      console.log(formData);
    }
  };

  const handleInputChange = (name) => (e) => {
    const { name, value } = e.target;
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
        Personal Details
      </Typography>
      <form onSubmit={nextPage}>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <TextField
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange("middleName")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(newDate) =>
                    handleInputChange("dateOfBirth")({
                      target: {
                        name: "dateOfBirth",
                        value: newDate.toISOString().split("T")[0],
                      },
                    })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} sx={{ mt: 2 }}>
            <TextField
              label="Taxpayer Number"
              name="tin"
              type="number"
              value={formData.tin}
              onChange={handleInputChange("tin")}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="sex">Sex</InputLabel>
              <Select
                labelId="sex"
                name="sex"
                id="sex"
                label="sex"
                value={formData.sex}
                onChange={handleInputChange("sex")}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <TextField
              label="Social Security Number"
              name="ssn"
              value={formData.ssn}
              onChange={handleInputChange("ssn")}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="nationality">Nationality</InputLabel>
              <Select
                labelId="nationality"
                name="nationality"
                id="nationality"
                label="nationality"
                value={formData.nationality}
                onChange={handleInputChange("nationality")}
              >
                {nationalities.slice().map((el) => (
                  <MenuItem key={el.value} value={el.value}>
                    {el.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="maritalStatus">Marital Status</InputLabel>
              <Select
                labelId="maritalStatus"
                name="maritalStatus"
                id="maritalStatus"
                label="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange("maritalStatus")}
              >
                {maritalStatuses.slice().map((el) => (
                  <MenuItem key={el.value} value={el.value}>
                    {el.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {formData.maritalStatus !== "Single" &&
            formData.maritalStatus !== "" && (
              <Grid item xs={6} sx={{ mt: 2 }}>
                <TextField
                  label="Spouse Name"
                  name="spouseName"
                  value={formData.spouseName}
                  onChange={handleInputChange("spouseName")}
                  fullWidth
                />
              </Grid>
            )}
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
            disabled
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

export default PersonalDetailsForm;
