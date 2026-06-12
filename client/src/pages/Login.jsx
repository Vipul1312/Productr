import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setPendingEmail } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter email or phone number");
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post("/auth/send-otp", { email });
      setPendingEmail(email);
      toast.success(`OTP sent: ${data.otp}`);
      navigate("/otp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="auth-title">Login to your Productr Account</h2>
      <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="field-group">
          <label className="field-label">Email or Phone number</label>
          <input
            className="field-input"
            placeholder="Enter email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn-primary" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>

      <div className="signup-box">
        Don't have a Productr Account
        <br />
        <b>SignUp Here</b>
      </div>
    </AuthLayout>
  );
};

export default Login;
