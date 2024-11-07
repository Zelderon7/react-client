import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // Optional: import your main CSS if you have global styles
import "./tailwind.css";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ConfirmEmail from "./pages/ConfirmEmail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;
