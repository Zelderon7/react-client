import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"; // Optional: import your main CSS if you have global styles
import "./tailwind.css";
import Login from "./pages/authorization/Login";
import Registration from "./pages/authorization/Registration";
import ConfirmEmail from "./pages/authorization/ConfirmEmail";
import Home from "./pages/general/Home";
import ThemeToggle from "./components/general/ThemeSwitch";
import FullClass from "./pages/classes/FullClass";

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/class/:classId" element={<FullClass />} />
      </Routes>
    </Router>
  );
};

export default App;
