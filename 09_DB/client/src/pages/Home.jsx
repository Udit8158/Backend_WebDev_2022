import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated, logOut } = useContext(AuthContext);
  return (
    <div>
      <nav className="flex w-5/6 mx-auto justify-between text-lg">
        <p>{isAuthenticated.username}</p>
        <button
          className="p-2 bg-blue-600"
          onClick={() => {
            logOut();
          }}
        >
          Log Out
        </button>
      </nav>
    </div>
  );
};

export default Home;
