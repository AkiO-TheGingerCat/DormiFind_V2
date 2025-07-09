import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setError(false);
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/owners-dashboard");
    } else {
      setError(true);
      setErrorMessage(data.message || "Invalid credentials");
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="brand-name">
          <span className="dormi">Dormi</span>
          <span className="find">find</span>
        </div>
      </nav>

      <div className="login-page">
        <div className="login-left">
          <div className="left-content">
            <h1>Admin Login</h1>
            <p>
              Please log in with your administrator credentials to manage the platform.
            </p>
            <form className="login-form" onSubmit={handleLogin}>
              <label>Admin Email*</label>
              <input
                type="email"
                placeholder="Enter your admin email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error ? "input-error" : ""}
                required
              />

              <label>Password*</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error ? "input-error" : ""}
                required
              />

              {error && <p className="error-message">{errorMessage}</p>}

              <button type="submit">Log In</button>

              <div className="register-link" style={{ fontSize: "14px" }}>
                New admin? <a href="/signup">Create an admin account</a>
              </div>
            </form>
          </div>
        </div>

        <div className="login-right">
          <div className="right-content"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
