import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";

export default function Cart() {
  const { state, dispatch, showToast } = useApp();
  const navigate = useNavigate();
  const { cart } = state;

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = cart.reduce((s, i) => s + i.quantity, 0);

  const remove = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
    showToast("Item removed from cart", "warning");
  };
  const update = (item, quantity) => dispatch({ type: "UPDATE_QUANTITY", payload: { ...item, quantity } });

  return (
    <Layout>
      <div style={{ padding: "24px", maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#131921", marginBottom: 4 }}>
          🛒 Shopping Cart
        </h1>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>{count} item{count !== 1 ? "s" : ""}</p>

        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", background: "#fff", borderRadius: 16 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
            <h2 style={{ color: "#333" }}>Your cart is empty</h2>
            <p style={{ color: "#666" }}>Add some amazing fashion items to get started!</p>
            <button onClick={() => navigate("/")}
              style={{ background: "#f90", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", marginTop: 16 }}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.size}`} style={{
                  background: "#fff", borderRadius: 12, padding: 16,
                  display: "flex", gap: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  alignItems: "flex-start",
                }}>
                  <img
                    src={item.image} alt={item.name}
                    onClick={() => navigate(`/product/${item.id}`)}
                    style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 8, cursor: "pointer" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#131921", marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>Brand: {item.brand} · Size: <strong>{item.size}</strong></div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#B12704", marginBottom: 10 }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => update(item, item.quantity - 1)}
                        style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #ddd", background: "#f3f3f3", fontWeight: 700, cursor: "pointer" }}>−</button>
                      <span style={{ fontWeight: 700, minWidth: 24, textAlign: "center" }}>{item.quantity}</span>
                      <button onClick={() => update(item, item.quantity + 1)}
                        style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #ddd", background: "#f3f3f3", fontWeight: 700, cursor: "pointer" }}>+</button>
                      <button onClick={() => remove(item)}
                        style={{ marginLeft: 8, background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", height: "fit-content", position: "sticky", top: 76 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Order Summary</h3>
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, color: "#555" }}>
                  <span style={{ flex: 1, marginRight: 8 }}>{item.name.slice(0, 20)}... ×{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ height: 1, background: "#eee", margin: "12px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#555", marginBottom: 6 }}>
                <span>Subtotal</span><span>₹{total.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#38a169", marginBottom: 12 }}>
                <span>Delivery</span><span>{total >= 499 ? "FREE" : "₹49"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, marginBottom: 16 }}>
                <span>Total</span><span>₹{(total + (total >= 499 ? 0 : 49)).toLocaleString()}</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                style={{ width: "100%", background: "#f90", border: "none", borderRadius: 8, padding: "12px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
              >
                Proceed to Checkout →
              </button>
              <button
                onClick={() => navigate("/")}
                style={{ width: "100%", background: "none", border: "1px solid #ddd", borderRadius: 8, padding: "10px", marginTop: 8, cursor: "pointer", fontSize: 13, color: "#555" }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}