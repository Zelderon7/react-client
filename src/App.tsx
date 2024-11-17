import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // Optional: import your main CSS if you have global styles
import "./tailwind.css";
import Login from "./pages/authorization/Login";
import Registration from "./pages/authorization/Registration";
import ConfirmEmail from "./pages/authorization/ConfirmEmail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;
