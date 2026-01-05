import Sidebar from "../../components/receptionist/sidebar/sidebar";
import Body from "../../components/receptionist/content/Body";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <Body />
    </div>
  );
}