import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState("published");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/products?status=${tab}&userEmail=${user.email}`);
      setProducts(data.products);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [tab]);

  const handlePublish = async (product) => {
    try {
      await api.patch(`/products/${product._id}/publish`);
      fetchProducts();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar title="🏠 Home" />
        <div className="content">
          <div className="tabs">
            <div className={`tab ${tab === "published" ? "active" : ""}`} onClick={() => setTab("published")}>
              Published
            </div>
            <div className={`tab ${tab === "unpublished" ? "active" : ""}`} onClick={() => setTab("unpublished")}>
              Unpublished
            </div>
          </div>

          {loading ? (
            <div className="loader">Loading...</div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">⊞</div>
              <div className="empty-title">
                No {tab === "published" ? "Published" : "Unpublished"} Products
              </div>
              <div className="empty-sub">
                Your {tab === "published" ? "published" : "unpublished"} products will appear here
                <br />
                Go to Products page to add new products
              </div>
            </div>
          ) : (
            <div className="grid">
              {products.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  onPublish={handlePublish}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;