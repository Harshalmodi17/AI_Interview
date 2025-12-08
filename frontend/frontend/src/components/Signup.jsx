// src/components/Signup.jsx
import { useState } from "react";
import { registerUser } from "../api/authService";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

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
      await registerUser(form.username, form.email, form.password);
      setMessage("Signup successful! You can now login.");
      setForm({ username: "", email: "", password: "" });
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.username?.[0] ||
        "Signup failed.";
      setMessage(msg);
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
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
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign up</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

