import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getProductById } from "../data/products";
import { useApp } from "../context/AppContext";

function Stars({ rating, size = 14 }) {
  return (
    <span style={{ color: "#f90", fontSize: size }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "#666", marginLeft: 4 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

const mockReviews = [
  { user: "Priya K.", rating: 5, text: "Absolutely love this! Great quality and fits perfectly.", date: "2 days ago" },
  { user: "Rahul M.", rating: 4, text: "Good product, fast delivery. Slightly different shade than pictures.", date: "1 week ago" },
  { user: "Anita S.", rating: 5, text: "Exceeded expectations! Will definitely buy again.", date: "2 weeks ago" },
  { user: "Karthik R.", rating: 3, text: "Decent quality for the price. Sizing runs a bit small.", date: "1 month ago" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch, state, showToast } = useApp();
  const product = getProductById(id);

  const [selectedSize, setSelectedSize] = useState("M");
  const [qty, setQty] = useState(1);

  if (!product) return (
    <Layout>
      <div style={{ padding: 60, textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>😕</div>
        <h2>Product not found</h2>
        <button onClick={() => navigate("/")} style={{ background: "#f90", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>Go Home</button>
      </div>
    </Layout>
  );

  const inWishlist = state.wishlist.some((i) => i.id === product.id);

  const addToCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch({ type: "ADD_TO_CART", payload: { ...product, size: selectedSize } });
    }
    showToast(`${product.name} added to cart! 🛒`);
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
      showToast("Removed from wishlist");
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
      showToast("Added to wishlist! ❤️");
    }
  };

  return (
    <Layout>
      <div style={{ padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: "#0066c0", marginBottom: 20 }}>
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</span> &rsaquo;{" "}
          <span onClick={() => navigate(`/products/${encodeURIComponent(product.subcategory)}`)} style={{ cursor: "pointer" }}>{product.subcategory}</span> &rsaquo; {product.name}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Image */}
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", aspectRatio: "1/1" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Details */}
          <div>
            <div style={{ display: "inline-block", background: "#f0fff4", color: "#22543d", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, marginBottom: 10 }}>
              {product.brand}
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#131921", marginBottom: 8, lineHeight: 1.3 }}>{product.name}</h1>
            <Stars rating={product.rating} size={16} />
            <span style={{ fontSize: 12, color: "#0066c0", marginLeft: 8 }}>{product.reviews.toLocaleString()} ratings</span>

            <div style={{ height: 1, background: "#e8e8e8", margin: "16px 0" }} />

            <div style={{ fontSize: 28, fontWeight: 800, color: "#B12704", marginBottom: 4 }}>
              ₹{product.price.toLocaleString()}
            </div>
            <div style={{ fontSize: 12, color: "#38a169", fontWeight: 600, marginBottom: 16 }}>✔ In Stock · Free delivery on orders above ₹499</div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 8 }}>Select Size</div>
              <div style={{ display: "flex", gap: 8 }}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      width: 44, height: 44, borderRadius: 8,
                      border: `2px solid ${selectedSize === s ? "#f90" : "#ddd"}`,
                      background: selectedSize === s ? "#fff8e1" : "#fff",
                      fontWeight: 700, cursor: "pointer", fontSize: 13,
                      color: selectedSize === s ? "#f90" : "#333",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 8 }}>Quantity</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #ddd", background: "#f3f3f3", fontWeight: 700, cursor: "pointer", fontSize: 16 }}>−</button>
                <span style={{ fontWeight: 700, fontSize: 16, minWidth: 24, textAlign: "center" }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)}
                  style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #ddd", background: "#f3f3f3", fontWeight: 700, cursor: "pointer", fontSize: 16 }}>+</button>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <button
                onClick={addToCart}
                style={{ flex: 1, background: "#f90", border: "none", borderRadius: 8, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => { addToCart(); navigate("/cart"); }}
                style={{ flex: 1, background: "#131921", color: "#f90", border: "none", borderRadius: 8, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
              >
                ⚡ Buy Now
              </button>
            </div>

            <button
              onClick={toggleWishlist}
              style={{
                width: "100%", background: inWishlist ? "#fff5f5" : "#fff",
                border: `1.5px solid ${inWishlist ? "#fc8181" : "#ddd"}`,
                borderRadius: 8, padding: "10px", fontSize: 14,
                fontWeight: 600, cursor: "pointer",
                color: inWishlist ? "#e53e3e" : "#333",
              }}
            >
              {inWishlist ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
            </button>

            <div style={{ marginTop: 20, padding: 16, background: "#f9f9f9", borderRadius: 10, fontSize: 13, color: "#555" }}>
              <strong>Description:</strong> {product.description}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Customer Reviews</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {mockReviews.map((r, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{r.user}</span>
                  <span style={{ fontSize: 11, color: "#999" }}>{r.date}</span>
                </div>
                <Stars rating={r.rating} size={12} />
                <p style={{ fontSize: 13, color: "#555", marginTop: 6, lineHeight: 1.5 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}