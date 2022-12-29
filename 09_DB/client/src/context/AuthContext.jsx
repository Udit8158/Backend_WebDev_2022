import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  isAuthenticated: false,
  registerUser: () => {},
  logIn: () => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
  );

  const navigate = useNavigate();

  const logInHandler = async (userInput) => {
    try {
      // login
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
      const data = await res.json();
      console.log(data);
      setIsAuthenticated(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const registerUserHandler = async (userInput) => {
    try {
      // register user
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
      const data = await res.json();
      console.log(data);

      logInHandler(userInput);
    } catch (err) {
      console.log(err);
    }
  };

  const logOutHandler = async () => {
    try {
      // logout
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      console.log(data);

      localStorage.removeItem("user");
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        registerUser: registerUserHandler,
        logIn: logInHandler,
        logOut: logInHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
