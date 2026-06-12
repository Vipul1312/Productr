import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(20);
  const inputs = useRef([]);
  const navigate = useNavigate();
  const { pendingEmail, login } = useAuth();

  useEffect(() => {
    if (!pendingEmail) navigate("/");
  }, [pendingEmail, navigate]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleChange = (val, i) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    setError(false);
    if (val && i < 5) inputs.current[i + 1].focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post("/auth/verify-otp", {
        email: pendingEmail,
        otp: code,
      });
      login(data.user);
      toast.success("Login successful");
      navigate("/home");
    } catch (err) {
      setError(true);
      toast.error(err.response?.data?.message || "Please enter a valid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    try {
      const { data } = await api.post("/auth/send-otp", { email: pendingEmail });
      toast.success(`OTP resent: ${data.otp}`);
      setTimer(20);
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <AuthLayout>
      <h2 className="auth-title">Login to your Productr Account</h2>
      <form onSubmit={handleVerify} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="field-group" style={{ maxWidth: 320 }}>
          <label className="field-label">Enter OTP</label>
          <div className="otp-row">
            {otp.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputs.current[i] = el)}
                className={`otp-box ${error ? "error" : ""}`}
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            ))}
          </div>
          {error && <p className="error-text">Please enter a valid OTP</p>}
        </div>
        <button className="btn-primary" style={{ maxWidth: 320 }} disabled={loading}>
          {loading ? "Verifying..." : "Enter your OTP"}
        </button>
      </form>

      <p className="resend-text">
        Didnt recive OTP ?{" "}
        {timer > 0 ? (
          <b style={{ cursor: "default" }}>Resend in {timer}s</b>
        ) : (
          <b onClick={handleResend}>Resend</b>
        )}
      </p>
    </AuthLayout>
  );
};

export default Otp;
