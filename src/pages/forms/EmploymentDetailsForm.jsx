import { countries, parishes, villages } from "../../assets/data";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../../assets/style.css";

const EmploymentDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const previousData = location.state ? location.state.formData : {};

  const [formData, setFormData] = useState({
    occupation: "",
    employersName: "",
    employersStreet: "",
    employersVillage: "",
    employersCountry: "",
    employersParish: "",
  });

  const prevPage = () => {
    navigate("/contact-details", {
      state: { formData: { ...previousData, ...formData } },
    });
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

  const updatePerson = async (e) => {
    e.preventDefault();

    if (formData.occupation === "") {
      toast.error("Occupation is required");
    } else if (formData.employersName === "") {
      toast.error("Employers Name is required");
    } else if (formData.employersVillage === "") {
      toast.error("Employers Village is required");
    } else if (formData.employersCountry === "") {
      toast.error("Employers Country is required");
    } else {
      const data = { ...previousData, ...formData };
      try {
        const response = await axios.post("person/create-person", data);
        const responseData = response.data;
        if (responseData.error) {
          toast.error(responseData.error);
        } else {
          console.log(responseData);
          toast.success("Details Added");
          try {
            const data = { personId: responseData._id };
            const values = await axios.post("values/create-person", data);
            const valuesData = values.data;
            if (valuesData.error) {
              toast.error(valuesData.error);
            } else {
              navigate("/");
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
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
        Employment Details
      </Typography>
      <form onSubmit={updatePerson}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange("occupation")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Employer's Name"
              name="employersName"
              value={formData.employersName}
              onChange={handleInputChange("employersName")}
              fullWidth
            />
          </Grid>
          <Grid item xs={7} sx={{ mt: 2 }}>
            <TextField
              label="Employer's Street"
              name="employersStreet"
              value={formData.employersStreet}
              onChange={handleInputChange("employersStreet")}
              fullWidth
            />
          </Grid>
          <Grid item xs={5} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                id="employersVillage"
                name="employersVillage"
                value={formData.employersVillage}
                onChange={(event, employersVillage) =>
                  handleInputChange("employersVillage")(employersVillage)
                }
                onInputChange={(event, newInputValue) => {
                  handleInputChange("employersVillage")(newInputValue);
                }}
                options={villages.map((el) => el.label)}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Employer's Village" />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={7} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                id="employersCountry"
                name="employersCountry"
                value={formData.employersCountry}
                onChange={(event, employersCountry) =>
                  handleInputChange("employersCountry")(employersCountry)
                }
                onInputChange={(event, newInputValue) => {
                  handleInputChange("employersCountry")(newInputValue);
                }}
                options={countries.map((el) => el.label)}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Employer's Country" />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                id="employersParish"
                name="employersParish"
                value={formData.employersParish}
                onChange={(event, employersParish) =>
                  handleInputChange("employersParish")(employersParish)
                }
                onInputChange={(event, newInputValue) => {
                  handleInputChange("employersParish")(newInputValue);
                }}
                options={parishes.map((el) => el.label)}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Employer's Parish" />
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

export default EmploymentDetailsForm;
