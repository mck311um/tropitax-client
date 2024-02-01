import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { Document, Page } from "react-pdf";

const PITForm = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);

  const data = location.state ? location.state.data : {};

  const fillPIT = async () => {
    const { personId, filingYear } = data;
    try {
      const data = { personId: personId, filingYear: filingYear };
      const response = await axios.post("/pdf/fill-pdf", data);
      const responseData = response.data;

      if (!responseData) {
        console.log("Something Happened");
      } else {
        getPIT(personId, filingYear);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPIT = async (personId, filingYear) => {
    const data = { personId: personId, fileYear: filingYear };
    try {
      const response = await axios.get("/pdf/get-pdf", data);
      const responseData = response.data;
      if (!responseData) {
        console.log("Something Happended");
      } else {
        setPdfData(responseData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error getting PDF:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const delay = 1500;

      setLoading(true);

      const timeoutId = setTimeout(async () => {
        await fillPIT();
      }, delay);

      return () => clearTimeout(timeoutId);
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && (
        <div className="loader-overlay">
          <Oval color="blue" height={50} width={50} />
        </div>
      )}

      {pdfData && (
        <Document file={pdfData}>
          <Page pageNumber={1} />
        </Document>
      )}
    </div>
  );
};

export default PITForm;
