import AdminDashboard from "./pages/Admin/adminDashboard";
import AdminLogin from "./pages/Admin/adminLogin";
import AdminSignup from "./pages/Admin/createAdmin";
import Home from "./pages/home";
import ReceptionistDashboard from "./pages/receptionistDashboard";
import Signup from "./pages/signup";
import { Routes, Route } from "react-router-dom";

export default function App () {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ad-signup" element={<AdminSignup />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path='/rcp' element={<ReceptionistDashboard />} />
      </Routes>
  )
}