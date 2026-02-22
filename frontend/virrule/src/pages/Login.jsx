import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (email === "test@test.com" && password === "1234") {
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <span className="wheel-icon">🎡</span>
          <h1>VirRule</h1>
          <p>Virtual Roulette</p>
        </div>

        <div className="divider"><span>sign in</span></div>

        <p className={`error-message ${error ? "visible" : ""}`}>{error}</p>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="login-btn" onClick={handleLogin}>Enter the Table</button>

        <p className="login-footer">No account? <span>Register</span></p>
      </div>
    </div>
  );
}

export default Login;