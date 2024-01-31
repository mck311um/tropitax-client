import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PersonalDetailsForm from "./pages/forms/PersonalDetailsForm";
import ContactDetailsForm from "./pages/forms/ContactDetailsForm";
import EmployerDetailsForm from "./pages/forms/EmploymentDetailsForm";
import IncomeDetailsForm from "./pages/forms/IncomeDetailsForm";
import AllowancesAndDeductionsForm from "./pages/forms/AllowancesAndDeductionsForm";
import AllowancesAndDeductionsForm2 from "./pages/forms/AllowancesAndDeductionsForm2";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import PITForm from "./pages/PITForm";

// axios.defaults.baseURL = "http://localhost:5001";
axios.defaults.baseURL = "https://tropitax-api.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  const theme = createTheme({
    typography: {
      caption: {
        fontStyle: "italic",
        opacity: "0.7",
        marginLeft: "10px",
        fontSize: "13px",
        fontWeight: "bold",
        color: "maroon",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="content">
        <NavBar />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-person" element={<PersonalDetailsForm />} />
          <Route path="/contact-details" element={<ContactDetailsForm />} />
          <Route path="/employment-details" element={<EmployerDetailsForm />} />
          <Route path="/income-details" element={<IncomeDetailsForm />} />
          <Route
            path="/allowance-details"
            element={<AllowancesAndDeductionsForm />}
          />
          <Route
            path="/allowance-details-2"
            element={<AllowancesAndDeductionsForm2 />}
          />
          <Route path="/get-pit" element={<PITForm />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
