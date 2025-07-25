import SingUpPage from "./pages/SingUp";
import { Route, Router, Routes } from "react-router-dom";
import Layout from "./Layout.js";
import "./App.css";
import Login from "./pages/Login.js";
import Dashbord from "./components/Dashbord.js";
import Groups from "./components/Groups.js";
import HomePage from "./pages/HomePage.js";
import ProtectedRoute from "./context/Auth.js";
import UserProfile from "./components/UserProfile.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/dashpage" element={<Dashbord />} />
          <Route path="/dashboard/addgroups" element={<Groups />} />
          <Route path="/dashboard/profile" element={<UserProfile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUpPage />} />
      </Routes>
    </>
  );
}

export default App;
