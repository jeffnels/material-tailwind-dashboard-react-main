import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import 'flowbite/dist/flowbite.css';
import { SignUp } from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />

      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
