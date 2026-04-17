import React from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { searchProducts } from "../data/products";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const results = searchProducts(query);

  return (
    <Layout>
      <div style={{ padding: "24px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#131921", marginBottom: 4 }}>
          {results.length > 0 ? `Results for "${query}"` : `No results for "${query}"`}
        </h1>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>{results.length} products found</p>
        {results.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 48 }}>🔍</div>
            <p style={{ color: "#666", marginTop: 12 }}>Try searching for: saree, shirt, jeans, kurti, tops...</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
            {results.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </Layout>
  );
}