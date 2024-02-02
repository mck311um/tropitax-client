import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const PersonsTable = () => {
const navigate = useNavigate();
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const personHeadCells = [{ id: "name", label: "Name" }];

  const getPersons = async () => {
    try {
      const personsResponse = await axios.get("/person/get-persons");
      const personsData = personsResponse.data;
      setPersons(personsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deletePerson = async (id) => {
    try {
      const data = { personId: id };
      const response = await axios.delete("/person/delete-person", { data });
      const responseData = response.data;
      if (!responseData) {
        console.log("Something Happened");
        toast.error(response.error);
      } else {
        toast.success(response.message);
        toast.success("Deleted Successfully");
        await getPersons();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const pendingFilingArray = persons.filter((el) => !el.taxFiled);

  const sortedData = [...pendingFilingArray].sort((a, b) => {
    const aValue = a[orderBy] || "";
    const bValue = b[orderBy] || "";
    return order === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const enterTaxDetails = (id) => {
    navigate("/income-details", {
      state: { personId: id },
    });
  };

  const updatePerson = (id) => {
    navigate("/update-person", { state: { updateData: { personId: id } } });
  };

  return <div> {loading && (
    <div className="loader-overlay">
      <Oval color="blue" height={50} width={50} />
    </div>
  )}
  <div className={`table-container${loading ? " blurred" : ""}`}>
    <TableContainer component={Paper} style={{ width: "70%" }}>
      <Table>
        <TableHead>
          <TableRow style={{ color: "#ff9900" }}>
            {personHeadCells.map((headCell) => (
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
          {sortedData.map((person) => (
            <TableRow key={`${person._id}`}>
              <TableCell>
                {`${person.lastName}, ${person.firstName}`}
              </TableCell>
              <TableCell>
                <Button onClick={() => updatePerson(person._id)}>
                  Update Info
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => enterTaxDetails(person._id)}>
                  File Taxes
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => deletePerson(person._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Button
                color="warning"
                onClick={() => {
                  navigate("/persons");
                }}
              >
                See More
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </div></div>;
};

export default PersonsTable;
