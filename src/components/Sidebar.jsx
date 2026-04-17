import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const navItems = [
  { icon: "🏠", label: "Home", path: "/" },
  { icon: "🛒", label: "Cart", path: "/cart" },
  { icon: "❤️", label: "Wishlist", path: "/wishlist" },
  { icon: "📦", label: "Orders", path: "/orders" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch, showToast } = useApp();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    showToast("Logged out successfully");
    navigate("/login");
  };

  const cartCount = state.cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div style={{
      position: "fixed", left: 0, top: 0, bottom: 0,
      width: 72, background: "#131921",
      display: "flex", flexDirection: "column",
      alignItems: "center", paddingTop: 16,
      zIndex: 100, borderRight: "1px solid #232f3e",
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        style={{
          width: 48, height: 48, borderRadius: 12,
          background: "linear-gradient(135deg, #f90, #e47911)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, cursor: "pointer", marginBottom: 24,
          boxShadow: "0 2px 8px rgba(249,144,0,0.4)"
        }}
        title="Home"
      >
        👗
      </div>

      {navItems.map(({ icon, label, path }) => {
        const isActive = location.pathname === path;
        const isBadge = label === "Cart" && cartCount > 0;
        return (
          <div
            key={path}
            onClick={() => navigate(path)}
            title={label}
            style={{
              position: "relative", width: 48, height: 48,
              borderRadius: 12, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              cursor: "pointer", marginBottom: 8,
              background: isActive ? "#232f3e" : "transparent",
              border: isActive ? "1px solid #f90" : "1px solid transparent",
              transition: "all 0.2s",
              fontSize: 20,
            }}
          >
            {icon}
            {isBadge && (
              <div style={{
                position: "absolute", top: 4, right: 4,
                background: "#f90", borderRadius: "50%",
                width: 16, height: 16, fontSize: 9,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#000", fontWeight: 700,
              }}>{cartCount}</div>
            )}
            <span style={{ fontSize: 8, color: isActive ? "#f90" : "#aaa", marginTop: 2 }}>{label}</span>
          </div>
        );
      })}

      <div style={{ flex: 1 }} />

      {/* User avatar */}
      {state.user && (
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "#f90", display: "flex", alignItems: "center",
          justifyContent: "center", color: "#000", fontWeight: 700,
          fontSize: 14, marginBottom: 8,
        }}>
          {state.user.name?.[0]?.toUpperCase() || "U"}
        </div>
      )}

      {/* Logout */}
      <div
        onClick={handleLogout}
        title="Logout"
        style={{
          width: 48, height: 48, borderRadius: 12,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          cursor: "pointer", marginBottom: 16, fontSize: 20,
          color: "#ff6b6b",
        }}
      >
        🚪
        <span style={{ fontSize: 8, color: "#ff6b6b", marginTop: 2 }}>Logout</span>
      </div>
    </div>
  );
}