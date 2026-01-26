import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Login";
import AdminSignup from "./pages/Admin/createAdmin";
import Home from "./pages/home";
import ReceptionistDashboard from "./pages/Receptionist/receptionistDashboard";
import PatientRegistration from "./pages/Receptionist/PatientRegistration";
import PatientManagement from "./pages/Receptionist/PatientManagement";
import VisitPage from "./pages/Receptionist/VisitPage";
import Signup from "./pages/Admin/CreateStaff";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import CreateStaff from "./pages/Admin/CreateStaff";
import StaffManagement from "./pages/Admin/StaffManagement";

export default function App () {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ad-signup" element={<AdminSignup />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin/dashboard" 
          element={<ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard/>
          </ProtectedRoute>}
        />

        <Route 
          path="/admin/create-staff" 
          element={<ProtectedRoute allowedRoles={["admin"]}>
            <CreateStaff/>
          </ProtectedRoute>}
        />

        <Route 
          path="/admin/staffs" 
          element={<ProtectedRoute allowedRoles={["admin"]}>
            <StaffManagement/>
          </ProtectedRoute>}
        />

        <Route 
          path="/rcp" 
          element={<ProtectedRoute allowedRoles={["receptionist"]}>
            <ReceptionistDashboard/>
          </ProtectedRoute>}
        />

        <Route 
          path="/rcp/register" 
          element={<ProtectedRoute allowedRoles={["receptionist"]}>
            <PatientRegistration/>
          </ProtectedRoute>}
        />

        <Route 
          path="/rcp/patients" 
          element={<ProtectedRoute allowedRoles={["receptionist","admin"]}>
            <PatientManagement/>
          </ProtectedRoute>}
        />

        <Route 
          path="/rcp/visits/:visitId" 
          element={<ProtectedRoute allowedRoles={["receptionist","admin"]}>
            <VisitPage/>
          </ProtectedRoute>}
        />
      </Routes>
  )
}