import React, { useState, useEffect } from 'react';
import axios from '../../axios'
import Login from '../Login';
import CrudTable from '../Table';
import Tabs from '../Tabs';
import Register from '../Register/index.js'
import config from '../../config.json'
import LoginRegister from './LoginRegisterTab'
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  let fun=async()=>{
    let res= await axios.get(`${config.url}/auth/verifyToken`)
    setIsAuthenticated(res?.data?.isValidToken)
  }
  useEffect(() => {
    fun()
  }, []);
  return (
    <>
      {isAuthenticated ? (
        <Tabs/>
      ) : (
        <LoginRegister setIsAuthenticated={setIsAuthenticated}/>
      )}
    </>
  );
};

export default App;
