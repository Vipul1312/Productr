import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import DeleteModal from "../components/DeleteModal";

const Products = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/products?userEmail=${user.email}`);
      setProducts(data.products);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      formData.append("userEmail", user.email);

      if (modal.mode === "edit") {
        await api.put(`/products/${modal.product._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated Successfully");
      } else {
        await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product added Successfully");
      }
      setModal(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (product) => {
    try {
      await api.patch(`/products/${product._id}/publish`);
      fetchProducts();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleDelete = async () => {
    try {
      setSaving(true);
      await api.delete(`/products/${deleteTarget._id}`);
      toast.success("Product Deleted Successfully");
      setDeleteTarget(null);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar title="📦 Products" showSearch />
        <div className="content">
          {loading ? (
            <div className="loader">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">⊞</div>
              <div className="empty-title">Feels a little empty over here...</div>
              <div className="empty-sub">
                You can create products without connecting store
                <br />
                you can add products to store anytime
              </div>
              <button className="btn-add" onClick={() => setModal({ mode: "add" })}>
                Add your Products
              </button>
            </div>
          ) : (
            <>
              <div className="page-head">
                <h2>Products</h2>
                <span className="add-link" onClick={() => setModal({ mode: "add" })}>
                  + Add Products
                </span>
              </div>
              <div className="grid">
                {products.map((p) => (
                  <ProductCard
                    key={p._id}
                    product={p}
                    onPublish={handlePublish}
                    onEdit={(prod) => setModal({ mode: "edit", product: prod })}
                    onDelete={(prod) => setDeleteTarget(prod)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {modal && (
        <ProductModal
          mode={modal.mode}
          product={modal.product}
          onClose={() => setModal(null)}
          onSubmit={handleSubmit}
          loading={saving}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          product={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          loading={saving}
        />
      )}
    </div>
  );
};

export default Products;