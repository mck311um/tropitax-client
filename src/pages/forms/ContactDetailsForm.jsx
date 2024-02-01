import { countries, parishes, villages } from "../../assets/data";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import { toast } from "react-hot-toast";
import "../../assets/style.css";

const ContactDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const previousData = location.state.formData;

  const [formData, setFormData] = useState({
    country: previousData?.country || "",
    email: previousData?.email || "",
    parish: previousData?.parish || "",
    street: previousData?.street || "",
    telHome: previousData?.telHome || "",
    telMobile: previousData?.telMobile || "",
    telWork: previousData?.telWork || "",
    village: previousData?.village || "",
  });

  const prevPage = () => {
    navigate("/add-person", { state: { formData: { ...previousData, ...formData } } });
  };

  const nextPage = (e) => {
    e.preventDefault();

    if (formData.email === "") {
      toast.error("Email is required");
    } else if (formData.country === "") {
      toast.error("Country is required");
    } else if (formData.parish === "") {
      toast.error("Parish is required");
    } else if (formData.village === "") {
      toast.error("Village is required");
    } 
    else {
      navigate("/employment-details", {
        state: { formData: { ...previousData, ...formData } },
      });
    }



    
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
        bgcolor: "rgba(240, 240, 240, 0.4)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        backdropFilter: "blur(10px)",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography id="form-title" variant="h3" component="h3">
        Contact Details
      </Typography>
      <form onSubmit={nextPage}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2 }}>
            <TextField
              label="Home Phone #"
              name="telHome"
              value={formData.telHome}
              onChange={handleInputChange("telHome")}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2 }}>
            <TextField
              label="Cell Phone #"
              name="telMobile"
              value={formData.telMobile}
              onChange={handleInputChange("telMobile")}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: 2 }}>
            <TextField
              label="Work Phone #"
              name="telWork"
              value={formData.telWork}
              onChange={handleInputChange("telWork")}
              fullWidth
            />
          </Grid>
          <Grid item xs={7} sx={{ mt: 2 }}>
            <TextField
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleInputChange("street")}
              fullWidth
            />
          </Grid>
          <Grid item xs={5} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                id="village"
                name="village"
                value={formData.village}
                onChange={(event, village) =>
                  handleInputChange("village")(village)
                }
                onInputChange={(event, newInputValue) => {
                  handleInputChange("village")(newInputValue);
                }}
                options={villages.map((el) => el.label)}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Village" />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={7} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                id="country"
                name="country"
                value={formData.country}
                onChange={(event, country) =>
                  handleInputChange("country")(country)
                }
                onInputChange={(event, newInputValue) => {
                  handleInputChange("country")(newInputValue);
                }}
                options={countries.map((el) => el.label)}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Country" />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                id="parish"
                name="parish"
                value={formData.parish}
                onChange={(event, parish) =>
                  handleInputChange("parish")(parish)
                }
                onInputChange={(event, newInputValue) => {
                  handleInputChange("parish")(newInputValue);
                }}
                options={parishes.map((el) => el.label)}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Parish" />
                )}
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

export default ContactDetailsForm;
