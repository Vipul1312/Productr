import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Home from "./pages/Home";
import Products from "./pages/Products";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/home" element={<Protected><Home /></Protected>} />
        <Route path="/products" element={<Protected><Products /></Protected>} />
      </Routes>
    </>
  );
};

export default App;