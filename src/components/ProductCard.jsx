import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Stars({ rating }) {
  return (
    <span style={{ color: "#f90", fontSize: 12 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "#666", marginLeft: 4 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { dispatch, showToast } = useApp();

  const addToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: { ...product, size: "M" } });
    showToast(`${product.name} added to cart! 🛒`);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        background: "#fff", borderRadius: 12,
        overflow: "hidden", cursor: "pointer",
        boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        display: "flex", flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.1)";
      }}
    >
      <div style={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/400x400/e8e8e8/666666?text=${encodeURIComponent(product.subcategory)}`;
          }}
          style={{
            position: "absolute", top: 0, left: 0,
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.3s",
          }}
        />
        <div style={{
          position: "absolute", top: 8, left: 8,
          background: "#f90", color: "#000",
          fontSize: 10, fontWeight: 700,
          padding: "2px 6px", borderRadius: 4,
        }}>
          {product.brand}
        </div>
      </div>
      <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#131921", lineHeight: 1.3, marginBottom: 4 }}>
          {product.name}
        </div>
        <Stars rating={product.rating} />
        <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>{product.reviews.toLocaleString()} reviews</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#B12704", marginBottom: 8 }}>
          ₹{product.price.toLocaleString()}
        </div>
        <button
          onClick={addToCart}
          style={{
            marginTop: "auto", background: "#f90",
            border: "none", borderRadius: 6,
            padding: "7px 0", fontSize: 12,
            fontWeight: 700, cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#e47911"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#f90"}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}