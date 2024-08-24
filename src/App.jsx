import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import 'flowbite/dist/flowbite.css';
import { SignUp } from "./pages/auth";
import OtpPage from "./pages/auth/otpPage";






function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />

      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/otp" element={<OtpPage/>} />
     
    </Routes>
  );
}

export default App;
