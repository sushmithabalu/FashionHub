import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../data/products";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      const results = searchProducts(val).slice(0, 6);
      setSuggestions(results);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleSearch = (q = query) => {
    if (!q.trim()) return;
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setQuery("");
  };

  return (
    <div ref={ref} style={{ position: "relative", flex: 1, maxWidth: 600 }}>
      <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
        <input
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search for sarees, shirts, jeans..."
          style={{
            flex: 1, padding: "10px 16px", fontSize: 14,
            border: "none", outline: "none",
            background: "#fff", color: "#131921",
          }}
        />
        <button
          onClick={() => handleSearch()}
          style={{
            background: "#f90", border: "none",
            padding: "10px 18px", cursor: "pointer",
            fontSize: 16, fontWeight: 700,
          }}
        >
          🔍
        </button>
      </div>
      {open && suggestions.length > 0 && (
        <div style={{
          position: "absolute", top: "110%", left: 0, right: 0,
          background: "#fff", borderRadius: 8,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 200,
          overflow: "hidden",
        }}>
          {suggestions.map((p) => (
            <div
              key={p.id}
              onClick={() => { navigate(`/product/${p.id}`); setOpen(false); setQuery(""); }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", cursor: "pointer",
                borderBottom: "1px solid #f0f0f0",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f7f7f7"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
            >
              <img src={p.image} alt="" style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 4 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#131921" }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "#666" }}>{p.subcategory} · ₹{p.price}</div>
              </div>
            </div>
          ))}
          <div
            onClick={() => handleSearch()}
            style={{
              padding: "10px 14px", fontSize: 13,
              color: "#0066c0", cursor: "pointer",
              textAlign: "center", fontWeight: 600,
            }}
          >
            See all results for "{query}"
          </div>
        </div>
      )}
    </div>
  );
}