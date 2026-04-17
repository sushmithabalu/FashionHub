import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";

const PAYMENT_OPTIONS = [
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
  { id: "gpay", label: "Google Pay (GPay)", icon: "📱" },
  { id: "phonepe", label: "PhonePe", icon: "💜" },
];

export default function Checkout() {
  const { state, dispatch, showToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: state.user?.name || "", phone: "", city: "", address: "" });
  const [payment, setPayment] = useState("cod");
  const [errors, setErrors] = useState({});
  const [ordered, setOrdered] = useState(false);

  const total = state.cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = total >= 499 ? 0 : 49;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit phone";
    if (!form.city.trim()) e.city = "City required";
    if (form.address.trim().length < 10) e.address = "Enter full address (min 10 chars)";
    return e;
  };

  const placeOrder = () => {
    if (state.cart.length === 0) { showToast("Your cart is empty!", "error"); return; }
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const order = {
      id: `ORD${Date.now()}`,
      items: state.cart,
      total: total + delivery,
      address: form,
      payment,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "Confirmed",
    };
    dispatch({ type: "ADD_ORDER", payload: order });
    dispatch({ type: "CLEAR_CART" });
    setOrdered(true);
  };

  if (ordered) {
    return (
      <Layout>
        <div style={{ padding: "60px 24px", textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#38a169", marginBottom: 8 }}>Order Placed!</h1>
          <p style={{ color: "#555", marginBottom: 8 }}>Thank you, <strong>{form.name}</strong>!</p>
          <p style={{ color: "#555", marginBottom: 24 }}>Your order has been confirmed and will be delivered to <strong>{form.city}</strong>.</p>
          <div style={{ background: "#f0fff4", border: "1px solid #68d391", borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 14 }}>
            <div>💳 Payment: {PAYMENT_OPTIONS.find(p => p.id === payment)?.label}</div>
            <div>📦 Total: ₹{(total + delivery).toLocaleString()}</div>
            <div>🚚 Free delivery: {delivery === 0 ? "Yes ✓" : "₹49"}</div>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => navigate("/orders")}
              style={{ background: "#131921", color: "#f90", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>
              Track Orders
            </button>
            <button onClick={() => navigate("/")}
              style={{ background: "#f90", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>
              Continue Shopping
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: "24px", maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#131921", marginBottom: 24 }}>📦 Checkout</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Delivery Details</h3>
              {[
                { key: "name", label: "Full Name", placeholder: "Your full name", type: "text" },
                { key: "phone", label: "Phone Number", placeholder: "10-digit mobile number", type: "tel" },
                { key: "city", label: "City", placeholder: "Your city", type: "text" },
                { key: "address", label: "Delivery Address", placeholder: "House no., Street, Area, Pincode", type: "text" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key} style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333", display: "block", marginBottom: 4 }}>{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    style={{
                      width: "100%", padding: "10px 12px", fontSize: 14,
                      border: `1.5px solid ${errors[key] ? "#e53e3e" : "#ddd"}`,
                      borderRadius: 8, outline: "none", boxSizing: "border-box",
                    }}
                  />
                  {errors[key] && <div style={{ color: "#e53e3e", fontSize: 12, marginTop: 3 }}>{errors[key]}</div>}
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Payment Method</h3>
              {PAYMENT_OPTIONS.map((opt) => (
                <label key={opt.id} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                  borderRadius: 8, marginBottom: 8, cursor: "pointer",
                  border: `2px solid ${payment === opt.id ? "#f90" : "#e8e8e8"}`,
                  background: payment === opt.id ? "#fff8e1" : "#fff",
                  transition: "all 0.2s",
                }}>
                  <input type="radio" name="payment" value={opt.id} checked={payment === opt.id} onChange={() => setPayment(opt.id)} style={{ accentColor: "#f90" }} />
                  <span style={{ fontSize: 20 }}>{opt.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", height: "fit-content", position: "sticky", top: 76 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Order Summary</h3>
            <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 12 }}>
              {state.cart.map((item) => (
                <div key={`${item.id}-${item.size}`} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
                  <img src={item.image} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>{item.name.slice(0, 22)}...</div>
                    <div style={{ fontSize: 11, color: "#666" }}>Sz: {item.size} · Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: "#eee", margin: "10px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#555", marginBottom: 4 }}>
              <span>Subtotal</span><span>₹{total.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: delivery === 0 ? "#38a169" : "#555", marginBottom: 10 }}>
              <span>Delivery</span><span>{delivery === 0 ? "FREE ✓" : `₹${delivery}`}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, marginBottom: 16 }}>
              <span>Grand Total</span><span>₹{(total + delivery).toLocaleString()}</span>
            </div>
            <button
              onClick={placeOrder}
              style={{ width: "100%", background: "#f90", border: "none", borderRadius: 8, padding: "13px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}
            >
              Place Order 🎉
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}