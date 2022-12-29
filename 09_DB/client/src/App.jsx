import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Routes>
        {isAuthenticated && <Route path="/" element={<Home />} />}
        {!isAuthenticated && <Route path="/auth" element={<Auth />} />}
      </Routes>
    </>
  );
}

export default App;
