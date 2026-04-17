import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [errors, setErrors] = useState({});
  const [isSignup, setIsSignup] = useState(false);
  const { dispatch, showToast } = useApp();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Password must be at least 6 chars";
    if (isSignup && !form.name.trim()) e.name = "Name is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const user = { email: form.email, name: isSignup ? form.name : form.email.split("@")[0] };
    dispatch({ type: "LOGIN", payload: user });
    showToast(`Welcome, ${user.name}! 🎉`);
    navigate("/");
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #131921 0%, #232f3e 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: "40px 36px",
        width: "100%", maxWidth: 420,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>👗</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#131921", margin: 0 }}>
            Fashion<span style={{ color: "#f90" }}>Hub</span>
          </h1>
          <p style={{ color: "#666", fontSize: 14, marginTop: 6 }}>
            {isSignup ? "Create your account" : "Sign in to continue shopping"}
          </p>
        </div>

        {isSignup && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Full Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              style={inputStyle(errors.name)}
            />
            {errors.name && <div style={errStyle}>{errors.name}</div>}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            style={inputStyle(errors.email)}
          />
          {errors.email && <div style={errStyle}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Min. 6 characters"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={inputStyle(errors.password)}
          />
          {errors.password && <div style={errStyle}>{errors.password}</div>}
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: "100%", background: "#f90", border: "none",
            borderRadius: 8, padding: "13px", fontSize: 15,
            fontWeight: 700, cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#e47911"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#f90"}
        >
          {isSignup ? "Create Account" : "Sign In"}
        </button>

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 13 }}>
          {isSignup ? "Already have an account? " : "New to FashionHub? "}
          <span
            onClick={() => { setIsSignup(!isSignup); setErrors({}); }}
            style={{ color: "#0066c0", fontWeight: 600, cursor: "pointer" }}
          >
            {isSignup ? "Sign In" : "Create account"}
          </span>
        </div>

        <div style={{ marginTop: 20, padding: 12, background: "#fffbf0", borderRadius: 8, fontSize: 12, color: "#666", border: "1px solid #ffe599" }}>
          💡 <strong>Demo:</strong> Use any email + 6-char password to login
        </div>
      </div>
    </div>
  );
}

const inputStyle = (hasErr) => ({
  width: "100%", padding: "10px 14px", fontSize: 14,
  border: `1.5px solid ${hasErr ? "#e53e3e" : "#ddd"}`,
  borderRadius: 8, outline: "none", marginTop: 4,
  boxSizing: "border-box", transition: "border 0.2s",
});
const errStyle = { color: "#e53e3e", fontSize: 12, marginTop: 4 };