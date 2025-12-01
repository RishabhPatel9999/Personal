// GlobalContext.jsx
import { createContext, useState, useEffect } from "react";

export const userContext = createContext();

function GlobalContext({ children }) {
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [header, setHeader] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);


  const loadUser = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("logedinUser");

    if (storedToken && storedUser) {
      const user = JSON.parse(storedUser);
      setToken(storedToken);
      setUserID(user._id);
      setUserName(user.userName);
      setRole(user.hasRole);
      setIsAuth(true);
      setHeader({
        headers: { Authorization: `Bearer ${storedToken}` , "Content-Type": "multipart/form-data" },
      });
    } else {
      setUserName(null);
      setUserID(null);
      setRole(null);
      setToken(null);
      setHeader(null);
      setIsAuth(false);
    }
  };

  const login = (tokenValue, userData) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("logedinUser", JSON.stringify(userData));
    loadUser();
  };

  const logout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("logedinUser");
    
    setUserName(null);
    setUserID(null);
    setRole(null);
    setToken(null);
    setHeader(null);
    setIsAuth(false);    
  };

  return (
    <userContext.Provider
      value={{
        userName,
        userID,
        role,
        isAuth,
        token,
        header,
        login,
        logout,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export default GlobalContext;
