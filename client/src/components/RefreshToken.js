import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import './refreshToken.css'
const RefreshToken = ({ setIsAuthenticated }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timeout1 = setTimeout(() => {
      setIsAuthenticated(false);
      Cookies.set("token", "");
      window.location.reload(false);
    }, 40000);

    let timeout2 = setTimeout(() => {
      setShow(true);
    }, 20000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [setIsAuthenticated,show]);

  const handleClick = () => {
    setShow(false);
  };

  if (show) {
    return (
      <div className="notification-box">
        <p>Your Session will expire in 20 sec</p>
        <button onClick={handleClick}>Refresh Token</button>
      </div>
    );
  } else {
    return null; // or you can return an empty div or null if you don't want to render anything
  }
};

export default RefreshToken;
