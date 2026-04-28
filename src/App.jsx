import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./app/Auth/login";
import Home from "./page/Home";
import ResetPassword from "./app/Auth/resetPassword";
import HTverification from "./page/HTverification";
import Protect from "./Context/ProtectedRoute";
import AdminRoutes from "./app/Routes/AdminRoutes";
import StudyCenterRoutes from "./app/Routes/StudyCenterRoutes";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <Protect requiredRole={["admin"]}>
              <Routes>
                {AdminRoutes()}
              </Routes>
            </Protect>
          }
        />

        {/* Study Center Routes */}
        <Route
          path="/studycenter/*"
          element={
            <Protect requiredRole={["studycenter_user"]}>
              <Routes>
                {StudyCenterRoutes()}
              </Routes>
            </Protect>
          }
        />

        <Route path="/ht-verification/:id" element={<HTverification />} />
      </Routes>
    </Router>
  );
}

export default App;
