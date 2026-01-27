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
import Dashboard from "./pages/Doctor/Dashboard";
import PendingVisits from "./pages/Doctor/PendingPatients";
import DoctorVisitPage from "./pages/Doctor/DoctorVisitPage";
import AdmittedPatients from "./pages/Doctor/AdmittedPatients";
import DoctorPatientList from "./pages/Doctor/DoctorPatientList";
import DoctorPatientHistory from "./pages/Doctor/PatientHistory";
import NurseDashboard from "./pages/Nurse/NurseDashboard";
import NurseAdmittedPatients from "./pages/Nurse/AdmittedPatients";
import NurseRecordVitals from "./pages/Nurse/RecordVitals";

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
          path="/rcp/dashboard" 
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

        <Route 
          path="/doctor/dashboard"
          element={<ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard/>
          </ProtectedRoute>}
        />

        <Route 
          path="/doctor/patients" 
          element={<ProtectedRoute allowedRoles={["receptionist","admin"]}>
            <DoctorPatientList/>
          </ProtectedRoute>}
        />

        <Route 
          path="/doctor/pending"
          element={<ProtectedRoute allowedRoles={["doctor"]}>
            <PendingVisits/>
          </ProtectedRoute>}
        />

        <Route 
          path="/doctor/visits/:visitId"
          element={<ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorVisitPage/>
          </ProtectedRoute>}
        />

        <Route 
          path="/doctor/admitted"
          element={<ProtectedRoute allowedRoles={["doctor"]}>
            <AdmittedPatients/>
          </ProtectedRoute>}
        />

        <Route
          path="/doctor/patients/:patientId/history"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorPatientHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/dashboard"
          element={
            <ProtectedRoute allowedRoles={["nurse"]}>
              <NurseDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/admitted"
          element={
            <ProtectedRoute allowedRoles={["nurse"]}>
              <NurseAdmittedPatients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nurse/visits/:visitId/vitals"
          element={
            <ProtectedRoute allowedRoles={["nurse"]}>
              <NurseRecordVitals />
            </ProtectedRoute>
          }
        />

      </Routes>
  )
}