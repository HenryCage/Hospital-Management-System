import { useNavigate } from "react-router-dom";
import { NavItem } from "./Navitems";

export default function Navigation () {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-col gap-2">
        <NavItem icon="dashboard" label="Dashboard" active />
        <NavItem onClick={() => navigate('/rcp/patients')} icon="group" label="Patient List" />
    </nav>
  );
}