import axios from "axios";
import Cookies from "js-cookie";
import config from "./config.json";

const instance = axios.create({
  baseURL: config.url,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    let token = Cookies.get("token");
    if (token) {
      
        config.headers["x-auth-token"] = token;
      
    }
    
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
