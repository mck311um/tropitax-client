import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/style.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Button,
} from "@mui/material";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [personsArray, setPersonsArray] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const headCells = [
    { id: "name", label: "Name" },
    { id: "year", label: "Filing Year" },
    { id: "status", label: "Status" },
  ];

  const getPersons = async () => {
    try {
      const personsResponse = await axios.get("/person/get-persons");
      const personsData = personsResponse.data;

      const personsWithValues = await Promise.all(
        personsData.map(async (person) => {
          const valuesResponse = await axios.get("/values/get-filing-years", {
            params: { personId: person._id },
          });
          const valuesData = valuesResponse.data;

          return { ...person, values: valuesData };
        })
      );

      setPersonsArray(personsWithValues);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deletePerson = async (id, filingYear) => {
    try {
      const data = { personId: id, filingYear: filingYear }
      const response = await axios.delete("/values/delete-values", { data })
      const responseData = response.data
      if (!responseData) {
        console.log("Something Happened")
      } else {
        toast.success("Deleted Successfully")
        await getPersons();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const pendingFilingArray = personsArray.filter((el) => !el.taxFiled);

  useEffect(() => {
    const fetchData = async () => {
      const delay = 1500;

      setLoading(true);

      const timeoutId = setTimeout(async () => {
        await getPersons();
        setLoading(false);
      }, delay);

      return () => clearTimeout(timeoutId);
    };

    fetchData();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    console.log("orderBy:", orderBy);
    console.log("order:", order);
  };

  const sortedData = [...pendingFilingArray].sort((a, b) => {
    const aValue = a[orderBy] || "";
    const bValue = b[orderBy] || "";
    return order === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const enterTaxDetails = (id, filingYear) => {
    navigate("/income-details", {
      state: { personId: id, filingYear: filingYear },
    });
  };

  const getPIT = async (id, filingYear) => {
    try {
      const data = { personId: id, filingYear: filingYear };
      const response = await axios.post("/pdf/fill-pdf", data);
      const responseData = response.data;

      if (!responseData) {
        console.log("Something Happened");
      } else {
        navigate("/get-pit", {
          state: { personId: id, filingYear: filingYear },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      {loading && (
        <div className="loader-overlay">
          <Oval color="blue" height={50} width={50} />
        </div>
      )}
      <div className={`table-container${loading ? " blurred" : ""}`}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((person) =>
                person.values.map((value) => (
                  <TableRow key={`${person._id}-${value._id}`}>
                    <TableCell>
                      {`${person.lastName}, ${person.firstName}`}
                    </TableCell>
                    <TableCell>{value.filingYear}</TableCell>
                    <TableCell>
                      {person.taxFiled ? "Completed" : "Pending"}
                    </TableCell>
                    <TableCell style={{ width: "calc(40%/5)" }}>
                      <Button
                        onClick={() =>
                          enterTaxDetails(person._id, value.filingYear)
                        }
                      >
                        Info
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: "calc(40%/4)" }}>
                      <Button
                        onClick={() =>
                          enterTaxDetails(person._id, value.filingYear)
                        }
                      >
                        Tax Details
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: "calc(40%/5)" }}>
                      <Button
                        onClick={() => getPIT(person._id, value.filingYear)}
                      >
                        Get PIT
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: "calc(40%/5" }}>
                      <Button
                        color="error"
                        onClick={() => deletePerson(person._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Dashboard;