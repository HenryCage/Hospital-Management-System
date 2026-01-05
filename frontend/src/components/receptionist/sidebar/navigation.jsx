import { NavItem } from "./Navitems";

export default function Navigation () {
  return (
    <nav className="flex flex-col gap-2">
        <NavItem icon="dashboard" label="Dashboard" active />
        <NavItem icon="group" label="Patient List" />
        <NavItem icon="calendar_month" label="Appointments" />
        <NavItem icon="settings" label="Settings" />
    </nav>
  );
}