import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";
const Login = ({ setIsAuthenticated }) => {
  const adminEmail = "";
  const adminPassword = "";

  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState(adminPassword);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(`${config.url}/auth/login`, {
        username: email,
        password: password,
      });

      if (res.data) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem("is_authenticated", true);
            setIsAuthenticated(true);
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour in milliseconds

            Cookies.set("token", res.data.token, {
              expires: expirationDate,
            });
            Swal.fire({
              icon: "success",
              title: "Successfully logged in!",
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      } else {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Incorrect email or password.",
              showConfirmButton: true,
            });
          },
        });
      }
    } catch (error) {
      console.error("Login failed:", error);

      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Incorrect email or password.",
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div className="small-container content">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <label htmlFor="email">Username</label>
        <input
          id="email"
          type="username"
          name="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="qwerty"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input style={{ marginTop: "12px" }} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
