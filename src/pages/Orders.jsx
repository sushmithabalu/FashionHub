import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";

const statusColors = {
  Confirmed: { bg: "#e6fffa", color: "#2c7a7b" },
  Delivered: { bg: "#f0fff4", color: "#276749" },
  Processing: { bg: "#fffbeb", color: "#92400e" },
};

export default function Orders() {
  const { state } = useApp();
  const navigate = useNavigate();
  const { orders } = state;

  return (
    <Layout>
      <div style={{ padding: "24px", maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#131921", marginBottom: 4 }}>📦 My Orders</h1>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>{orders.length} order{orders.length !== 1 ? "s" : ""}</p>

        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", background: "#fff", borderRadius: 16 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>📦</div>
            <h2 style={{ color: "#333" }}>No orders yet</h2>
            <p style={{ color: "#666" }}>Your orders will appear here once you checkout.</p>
            <button onClick={() => navigate("/")}
              style={{ background: "#f90", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", marginTop: 16 }}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {orders.map((order) => {
              const sc = statusColors[order.status] || statusColors.Confirmed;
              return (
                <div key={order.id} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ padding: "14px 20px", background: "#f9f9f9", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#131921" }}>Order #{order.id}</div>
                      <div style={{ fontSize: 12, color: "#666" }}>Placed on {order.date}</div>
                    </div>
                    <div style={{ background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>
                      ✔ {order.status}
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 12 }}>
                      {order.items.map((item) => (
                        <img
                          key={`${item.id}-${item.size}`}
                          src={item.image} alt={item.name}
                          title={item.name}
                          onClick={() => navigate(`/product/${item.id}`)}
                          style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, cursor: "pointer", flexShrink: 0 }}
                        />
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 13, color: "#555" }}>
                        {order.items.length} item{order.items.length > 1 ? "s" : ""} · {order.address.city} · {order.payment.toUpperCase()}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#131921" }}>₹{order.total.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}