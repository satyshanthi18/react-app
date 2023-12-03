import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import config from "../../config.json";
import axios from "../../axios";

const Add = ({ data, setdata, setIsAdding, columns, endpoint, title, selectedMonth, selectedYear }) => {
  let x = {};
  columns.map((column) => (x[column.field] = ""));
  const [empData, setEmpData] = useState(x);
  const [categories, setCategories]= useState([])
  useEffect(() => {
    const fun=async()=>{
      const res = await axios.get(`${config.url}/category`)
      setCategories(res.data)
      setEmpData({...empData,categories:res?.data[0]})
    }
    fun()
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // Your code for sending the API request
      let finalData ={...empData, month:selectedMonth, year:selectedYear}
      let res = await axios.post(`${config.url}/${endpoint}`, finalData);
      // Your code for updating the local state
      data.push(res.data);
      setdata(data);
      setIsAdding(false);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: ` data has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Handle errors that occur during the API request
      console.error("Error during API request:", error);

      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add data. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  const handleEmp = (e) => {
    setEmpData({ ...empData, [e.target.name]: e.target.value });
  };
  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add {title}</h1>
        {columns.map((column, i) => (
          <div key={i}>
            <label htmlFor={column.field}>{column.label}</label>

            {column.type === "select" ? (
              <select
                name={column.field}
                id={column.field}
                value={empData[column.field]}
                onChange={(e) => handleEmp(e)}
              >
                <option key={0} >Select Category</option>
                {categories.map((option, index) => (
                  <option key={index+1} value={option.category}>
                    {option.category}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={column.field}
                type={column.type}
                name={column.field}
                value={empData[column.field]}
                onChange={(e) => handleEmp(e)}
              />
            )}
          </div>
        ))}

        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
