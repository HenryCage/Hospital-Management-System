import { useNavigate } from "react-router-dom";

export default function LoggingOut() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate('/login', {replace: true})
  }

  return logout
}