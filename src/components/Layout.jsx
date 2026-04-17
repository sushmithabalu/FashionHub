import React from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const { state } = useApp();
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f3f3" }}>
      <Sidebar />
      <div style={{ marginLeft: 72, flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Nav */}
        <header style={{
          background: "#131921",
          padding: "10px 24px",
          display: "flex", alignItems: "center", gap: 16,
          position: "sticky", top: 0, zIndex: 50,
        }}>
          <div
            onClick={() => navigate("/")}
            style={{ color: "#fff", fontWeight: 800, fontSize: 20, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            👗 <span style={{ color: "#f90" }}>Fashion</span>Hub
          </div>
          <SearchBar />
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "👔 Men", path: "/category/men" },
              { label: "👗 Women", path: "/category/women" },
              { label: "🧒 Kids", path: "/category/kids" },
            ].map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                style={{
                  background: "transparent", border: "1px solid #555",
                  color: "#fff", borderRadius: 6, padding: "6px 12px",
                  cursor: "pointer", fontSize: 12, fontWeight: 600,
                  transition: "all 0.2s", whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#f90"; e.currentTarget.style.color = "#f90"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.color = "#fff"; }}
              >
                {label}
              </button>
            ))}
          </div>
          {state.user && (
            <div style={{ color: "#fff", fontSize: 12, whiteSpace: "nowrap", marginLeft: "auto" }}>
              Hello, <span style={{ color: "#f90", fontWeight: 700 }}>{state.user.name}</span>
            </div>
          )}
        </header>
        <main style={{ flex: 1 }}>{children}</main>
        {/* Footer */}
        <footer style={{ background: "#131921", color: "#fff", marginTop: 40 }}>
          <div style={{ background: "#232f3e", padding: "12px 24px", textAlign: "center", fontSize: 13 }}>
            <span onClick={() => document.getElementById("footer-main").scrollIntoView()} style={{ cursor: "pointer", color: "#f90" }}>
              ↑ Back to top
            </span>
          </div>
          <div id="footer-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24, padding: "32px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <div>
              <h4 style={{ color: "#f90", marginBottom: 12 }}>Get to Know Us</h4>
              <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>About FashionHub<br />Careers<br />Press Releases<br />FashionHub Cares</div>
            </div>
            <div>
              <h4 style={{ color: "#f90", marginBottom: 12 }}>Let Us Help You</h4>
              <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>Your Account<br />Returns Centre<br />100% Purchase Protection<br />Help</div>
            </div>
            <div>
              <h4 style={{ color: "#f90", marginBottom: 12 }}>Contact Us</h4>
              <div style={{ fontSize: 13, lineHeight: 2, color: "#ccc" }}>📞 1800-123-4567<br />📧 help@fashionhub.in<br />🕐 Mon–Sat 9AM–6PM<br />📍 Chennai, Tamil Nadu</div>
            </div>
            <div>
              <h4 style={{ color: "#f90", marginBottom: 12 }}>Our Location</h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497699.99974437516!2d80.23503!3d13.0478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1698000000000!5m2!1sen!2sin"
                width="100%" height="120" style={{ border: 0, borderRadius: 8 }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              />
            </div>
          </div>
          <div style={{ background: "#0f1923", textAlign: "center", padding: "16px", fontSize: 12, color: "#888" }}>
            © 2024 FashionHub. All Rights Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}