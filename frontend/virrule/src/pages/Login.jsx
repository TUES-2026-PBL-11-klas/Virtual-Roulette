import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();

      if (!res.ok) {
        setError(text || "Invalid username or password.");
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
    if (e.key === "Enter") handleLogin();
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
          <label>User Name</label>
          <input
            type="username"
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

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Joining..." : "Enter the Table"}
        </button>

        <p className="login-footer">
          No account?{" "}
          <span onClick={() => !loading && navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;