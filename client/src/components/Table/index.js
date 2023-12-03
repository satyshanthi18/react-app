import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import axios from "../../axios";
import config from "../../config.json";
import MonthYearDropdowns from "../MonthFilter";
const CrudTable = ({
  setIsAuthenticated,
  columns,
  endpoint,
  title,
  showDropDown,
}) => {
  const [data, setdata] = useState([]);
  const [selecteddataField, setSelecteddataField] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();

  const fetchData = async () => {
    try {
      let res;
      if (showDropDown) {
        res=await axios.get(
          `${config.url}/${endpoint}?month=${selectedMonth}&year=${selectedYear}`
        );
      } else {
        res=await axios.get(`${config.url}/${endpoint}`);
      }
      console.log("fetch", res);
      const data = res.data;
      setdata(data);
      // const data = JSON.parse(localStorage.getItem('data_data'));
      if (data !== null && Object.keys(data).length !== 0) {
        setdata(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    console.log("use Effect");
    fetchData();
  }, [selectedMonth, selectedYear]);

  const handleEdit = (id) => {
    const [dataField] = data.filter((dataField) => dataField.id === id);
    setSelecteddataField(dataField);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const { value } = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      });

      if (value) {
        await axios.delete(`${config.url}/${endpoint}/${id}`);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const dataCopy = data.filter((dataField) => dataField._id !== id);
        setdata(dataCopy);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `An error occurred while deleting the data.`,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="container">
      {showDropDown && (
        <MonthYearDropdowns
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />
      )}
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
            title={title}
          />
          <Table
            data={data}
            columns={columns}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          data={data}
          setdata={setdata}
          setIsAdding={setIsAdding}
          columns={columns}
          endpoint={endpoint}
          title={title}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      )}
      {isEditing && (
        <Edit
          data={data}
          selectedData={selecteddataField}
          setdata={setdata}
          setIsEditing={setIsEditing}
          columns={columns}
          endpoint={endpoint}
          title={title}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      )}
    </div>
  );
};

export default CrudTable;
