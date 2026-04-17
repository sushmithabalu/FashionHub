import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";

export default function Wishlist() {
  const { state, dispatch, showToast } = useApp();
  const navigate = useNavigate();
  const { wishlist } = state;

  const remove = (id) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
    showToast("Removed from wishlist", "warning");
  };

  const moveToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...item, size: "M" } });
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item.id });
    showToast(`${item.name} moved to cart! 🛒`);
  };

  return (
    <Layout>
      <div style={{ padding: "24px", maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#131921", marginBottom: 4 }}>❤️ My Wishlist</h1>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>

        {wishlist.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", background: "#fff", borderRadius: 16 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🤍</div>
            <h2 style={{ color: "#333" }}>Your wishlist is empty</h2>
            <p style={{ color: "#666" }}>Save items you love to buy later!</p>
            <button onClick={() => navigate("/")}
              style={{ background: "#f90", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", marginTop: 16 }}>
              Discover Products
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {wishlist.map((item) => (
              <div key={item.id} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <div style={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
                  <img
                    src={item.image} alt={item.name}
                    onClick={() => navigate(`/product/${item.id}`)}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
                  />
                  <button
                    onClick={() => remove(item.id)}
                    style={{ position: "absolute", top: 8, right: 8, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16 }}
                  >
                    ❤️
                  </button>
                </div>
                <div style={{ padding: "12px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#131921", marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#B12704", marginBottom: 10 }}>₹{item.price.toLocaleString()}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => moveToCart(item)}
                      style={{ flex: 1, background: "#f90", border: "none", borderRadius: 6, padding: "8px", fontWeight: 700, cursor: "pointer", fontSize: 12 }}
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      style={{ background: "none", border: "1px solid #ddd", borderRadius: 6, padding: "8px 10px", cursor: "pointer", fontSize: 12, color: "#e53e3e" }}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}