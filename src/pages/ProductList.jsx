import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { getProductsBySubcategory } from "../data/products";

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Avg. Customer Review" },
];

export default function ProductList() {
  const { subcategory } = useParams();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(subcategory);
  const allProducts = getProductsBySubcategory(decoded);

  const [sort, setSort] = useState("popular");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);

  const prices = allProducts.map((p) => p.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);

  const filtered = useMemo(() => {
    let arr = allProducts.filter((p) => p.price <= maxPrice && p.rating >= minRating);
    if (sort === "price_asc") arr = [...arr].sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") arr = [...arr].sort((a, b) => b.price - a.price);
    else if (sort === "rating") arr = [...arr].sort((a, b) => b.rating - a.rating);
    return arr;
  }, [allProducts, sort, maxPrice, minRating]);

  return (
    <Layout>
      <div style={{ display: "flex", gap: 0 }}>
        {/* Filters Sidebar */}
        <div style={{
          width: 220, flexShrink: 0, background: "#fff",
          padding: "24px 16px", borderRight: "1px solid #e8e8e8",
          minHeight: "calc(100vh - 56px)",
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: "#131921", marginBottom: 20 }}>Filters</h3>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10 }}>Price Range</div>
            <input type="range" min={minP} max={maxP} value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#f90" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", marginTop: 4 }}>
              <span>₹{minP}</span><span>₹{maxPrice.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#333", marginBottom: 10 }}>Min Rating</div>
            {[4, 3.5, 3, 0].map((r) => (
              <label key={r} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer", fontSize: 13 }}>
                <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)}
                  style={{ accentColor: "#f90" }}
                />
                {r > 0 ? <>{"★".repeat(Math.floor(r))} {r}+ stars</> : "All Ratings"}
              </label>
            ))}
          </div>

          <button
            onClick={() => { setMaxPrice(maxP); setMinRating(0); setSort("popular"); }}
            style={{ width: "100%", background: "#f3f3f3", border: "1px solid #ddd", borderRadius: 6, padding: "8px", cursor: "pointer", fontSize: 13 }}
          >
            Clear Filters
          </button>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "24px" }}>
          <div style={{ fontSize: 12, color: "#0066c0", marginBottom: 8 }}>
            <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Home</span> &rsaquo;{" "}
            <span onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>{decoded}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#131921", margin: 0 }}>{decoded}</h1>
              <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>{filtered.length} results</div>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", fontSize: 13, cursor: "pointer" }}
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#666" }}>
              <div style={{ fontSize: 40 }}>😕</div>
              <p>No products match your filters.</p>
              <button onClick={() => { setMaxPrice(maxP); setMinRating(0); }} style={{ background: "#f90", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>Clear Filters</button>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 16,
            }}>
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}