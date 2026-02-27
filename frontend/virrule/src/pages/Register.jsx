import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();

      if (!res.ok) {
        setError(text || "Could not register with these details.");
        return;
      }

      let user;
      try {
        user = JSON.parse(text);
      } catch {
        setError("Unexpected server response.");
        return;
      }

      localStorage.setItem("token", user.token);
      localStorage.setItem("user",JSON.stringify(user.user));
      navigate("/");
    } catch (err) {
      setError("Could not reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <span className="wheel-icon">🎡</span>
          <h1>VirRule</h1>
          <p>Virtual Roulette</p>
        </div>

        <div className="divider"><span>register</span></div>

        <p className={`error-message ${error ? "visible" : ""}`}>{error}</p>

        <div className="input-group">
          <label>User Name</label>
          <input
            type="text"
            placeholder="your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </div>

        <button className="login-btn" onClick={handleRegister} disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="login-footer">
          Already have an account?{" "}
          <span onClick={() => !loading && navigate("/login")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;

