// src/components/Login.jsx
import { useState } from "react";
import { loginUser, getCurrentUser, logoutUser } from "../api/authService";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // 1) login -> get tokens
      const res = await loginUser(form.username, form.password);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // 2) get current user
      const userRes = await getCurrentUser();
      setUser(userRes.data);
      setMessage("Login successful!");
    } catch (error) {
      console.error(error);
      setMessage("Invalid credentials or server error.");
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setMessage("Logged out.");
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {message && <p className="auth-message">{message}</p>}

      {user && (
        <div className="user-box">
          <h3>Welcome, {user.username} 👋</h3>
          <p>Email: {user.email || "not set"}</p>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
