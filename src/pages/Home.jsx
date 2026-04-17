import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { categories } from "../data/products";

const heroBanners = [
  { bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", emoji: "👔", title: "Men's Collection", sub: "Shirts, Jeans & More", path: "/category/men", accent: "#f90" },
  { bg: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)", emoji: "👗", title: "Women's Fashion", sub: "Sarees, Kurtis & More", path: "/category/women", accent: "#f472b6" },
  { bg: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)", emoji: "🧒", title: "Kids' Wear", sub: "Boys & Girls Collection", path: "/category/kids", accent: "#60a5fa" },
];

const catImages = {
  men: [
    { sub: "Shirts", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80" },
    { sub: "Pants", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&q=80" },
    { sub: "Jeans", img: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=300&q=80" },
    { sub: "Shorts", img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQbwG7obaE5cxhSsCZ2D3ryepAjPFJza1SgDk_NfYLpcMnEWGPkLPK4A8qu0qy6RPBCgHoQ5DwmK6gvnX5QUIkYeFdRh0wx322sEpYFLyUE6BWP0fgnqtpqe0f5j0eTmYqXmDj6ibqQsR7u&usqp=CAc" },
  ],
  women: [
    { sub: "Saree", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80" },
    { sub: "Kurti", img: "data:image/webp;base64,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" },
    { sub: "Tops", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80" },
    { sub: "Jeans", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&q=80" },
    { sub: "Skirts", img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=300&q=80" },
    { sub: "Crop Tops", img: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=300&q=80" },
  ],
  kids: [
    { sub: "Boys Wear", img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRNru3ZGf9G0WbgqdMJ7iQb0jJ4_wtfCKa-nNy5jCY5LN53B0DwcBJ_jX1tfrGt8J5Sz6cdCVfBEV9d2ty4dq_MjLjIrfGFhJjAqEiDxtZo0gmoasp2m_oalw" },
    { sub: "Girls Wear", img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQra_Eog5BFANN-r4xXNeMuxknAvGo4X43DXaag7X3C-FZZbJCyUhFZFlWvko2tDuLr-SdZiiIFA3JrWrcqzRY0xSIKsAdL8ZZFFVJE9ipZ" },
  ],
};

function SectionTitle({ title, path, navigate }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: "#131921", margin: 0 }}>{title}</h2>
      <button
        onClick={() => navigate(path)}
        style={{ background: "none", border: "1px solid #f90", color: "#f90", borderRadius: 6, padding: "5px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
      >
        See All →
      </button>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Banners */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, padding: "20px 24px" }}>
        {heroBanners.map((b) => (
          <div
            key={b.path}
            onClick={() => navigate(b.path)}
            style={{
              background: b.bg, borderRadius: 16, padding: "28px 24px",
              cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"; }}
          >
            <div style={{ fontSize: 40, marginBottom: 10 }}>{b.emoji}</div>
            <h3 style={{ color: b.accent, fontSize: 20, fontWeight: 800, margin: "0 0 4px" }}>{b.title}</h3>
            <p style={{ color: "#ccc", fontSize: 13, margin: 0 }}>{b.sub}</p>
            <div style={{ marginTop: 16, color: b.accent, fontSize: 13, fontWeight: 700 }}>Shop Now →</div>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div style={{
        margin: "0 24px 24px", padding: "16px 24px",
        background: "linear-gradient(90deg, #f90 0%, #e47911 100%)",
        borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#000" }}>🎉 Grand Fashion Sale — Up to 70% OFF!</div>
          <div style={{ fontSize: 13, color: "#333", marginTop: 2 }}>Limited time offer. Free delivery on orders above ₹499</div>
        </div>
        <button
          onClick={() => navigate("/category/women")}
          style={{ background: "#000", color: "#f90", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}
        >
          Shop Now
        </button>
      </div>

      {/* Category Sections */}
      {Object.entries(catImages).map(([cat, items]) => (
        <div key={cat} style={{ padding: "0 24px 32px" }}>
          <SectionTitle
            title={`${categories[cat].label}'s Collection`}
            path={`/category/${cat}`}
            navigate={navigate}
          />
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${items.length}, 1fr)`,
            gap: 12,
          }}>
            {items.map(({ sub, img }) => (
              <div
                key={sub}
                onClick={() => navigate(`/products/${encodeURIComponent(sub)}`)}
                style={{
                  borderRadius: 12, overflow: "hidden",
                  cursor: "pointer", background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
              >
                <div style={{ position: "relative", paddingTop: "75%", overflow: "hidden" }}>
                  <img
                    src={img} alt={sub}
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "10px 12px", fontWeight: 700, fontSize: 13, color: "#131921", textAlign: "center" }}>
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
}