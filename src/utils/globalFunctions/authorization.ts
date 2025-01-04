import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userIcon");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  return logOut;
}
