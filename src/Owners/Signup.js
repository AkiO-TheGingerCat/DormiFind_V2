import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Admin account created successfully!");
      navigate("/login");
    } else {
      alert(data.message || "Signup failed.");
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
            <h1>Create Admin Account</h1>
            <p>
              Sign up to create a new administrator account for managing the platform.
            </p>
            <form className="login-form" onSubmit={handleSignup}>
              <label>Full Name*</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Admin Email*</label>
              <input
                type="email"
                placeholder="Enter your admin email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password*</label>
              <input
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Sign Up</button>

              <div className="register-link">
                Already have an admin account? <a href="/login">Login</a>
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

export default Signup;
