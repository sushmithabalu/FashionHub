import React from "react";
import { useApp } from "../context/AppContext";

export default function Toast() {
  const { state } = useApp();
  if (!state.toast) return null;
  const { msg, type } = state.toast;
  const bg = type === "error" ? "#e53e3e" : type === "warning" ? "#dd6b20" : "#38a169";
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      background: bg, color: "#fff", padding: "12px 20px",
      borderRadius: 8, fontWeight: 600, fontSize: 14,
      boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      animation: "slideIn 0.3s ease",
      maxWidth: 320
    }}>
      {msg}
    </div>
  );
}