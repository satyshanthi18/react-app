import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CrudTable from "./Table";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "../axios";
import config from "../config.json";
import RefreshToken from "./RefreshToken";
export default function Tabs() {
  const [value, setValue] = React.useState("1");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [categories, setCategories] = useState([]);
  const columns = [
    {
      label: "First Name",
      field: "firstName",
      type: "text",
    },
    {
      label: "Last Name",
      field: "lastName",
      type: "text",
    },
    {
      label: "Email",
      field: "email",
      type: "email",
    },
    {
      label: "Salary",
      field: "salary",
      type: "number",
    },
    {
      label: "Date",
      field: "date",
      type: "date",
    },
  ];

  const expenses = [
    {
      label: "Description",
      field: "description",
      type: "text",
    },
    {
      label: "Category",
      field: "category",
      type: "select",
      options: categories,
    },
    {
      label: "Amount",
      field: "amount",
      type: "number",
    },
  ];
  const category = [
    {
      label: "Category",
      field: "category",
      type: "text",
    },
  ];

  const budget = [
    {
      label: "Category",
      field: "category",
      type: "select",
      options: categories,
    },
    {
      label: "Amount",
      field: "amount",
      type: "number",
    },
  ];

  const defaultBudget = [
    {
      label: "Category",
      field: "category",
      options: categories,
      type: "select",
    },
    {
      label: "Amount",
      field: "amount",
      type: "number",
    },
  ];

  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Logging Out",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },

          willClose: () => {
            // Cookies.remove('token')
            localStorage.setItem("is_authenticated", false);
            setIsAuthenticated(false);
          },
        });
      }
    });
  };

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem("is_authenticated")));
    const fun = async () => {
      const res = await axios.get(`${config.url}/category`);
      setCategories(res.data);
    };
    fun();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <RefreshToken setIsAuthenticated={setIsAuthenticated} />
      
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Dashboard" value="1" />
              <Tab label="Expenses" value="2" />
              <Tab label="Budget" value="3" />
              <Tab label="Categories" value="4" />
              {/* <Tab label="Default Budget" value="5" /> */}
              <Logout setIsAuthenticated={setIsAuthenticated} />
              {/* <Tab label="Log Out" value="5" /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <Dashboard />
          </TabPanel>
          <TabPanel value="2">
            <CrudTable
              setIsAuthenticated={setIsAuthenticated}
              showDropDown={true}
              columns={expenses}
              endpoint={"expenses"}
              title={"Expenses"}
            />
          </TabPanel>
          <TabPanel value="3">
            <CrudTable
              setIsAuthenticated={setIsAuthenticated}
              showDropDown={false}
              columns={budget}
              endpoint={"budget"}
              title={"Budget"}
            />
          </TabPanel>
          <TabPanel value="4">
            <CrudTable
              setIsAuthenticated={setIsAuthenticated}
              showDropDown={false}
              columns={category}
              endpoint={"category"}
              title={"Category"}
            />
          </TabPanel>
          {/* <TabPanel value="5"><CrudTable setIsAuthenticated={setIsAuthenticated} showDropDown={false} columns={defaultBudget} endpoint={'defaultBudget'} title={'Default Budget'}/></TabPanel> */}
          <TabPanel>
            <Logout setIsAuthenticated={setIsAuthenticated} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
