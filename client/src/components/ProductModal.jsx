import { useState, useEffect } from "react";

const TYPES = ["Foods", "Electronics", "Clothes", "Beauty Products", "Others"];

const ProductModal = ({ mode, product, onClose, onSubmit, loading }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    quantityStock: "",
    mrp: "",
    sellingPrice: "",
    brandName: "",
    exchangeEligibility: "Yes",
  });
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (mode === "edit" && product) {
      setForm({
        name: product.name || "",
        type: product.type || "",
        quantityStock: product.quantityStock || "",
        mrp: product.mrp || "",
        sellingPrice: product.sellingPrice || "",
        brandName: product.brandName || "",
        exchangeEligibility: product.exchangeEligibility || "Yes",
      });
      // Existing images from Cloudinary URLs
      setPreviews(product.images || []);
    }
  }, [mode, product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Please enter product name";
    if (!form.type) err.type = "Please select product type";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    // FormData bhejenge kyunki files hain
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    files.forEach((f) => formData.append("images", f));
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{mode === "edit" ? "Edit Product" : "Add Product"}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="form-field">
          <label>Product Name</label>
          <input name="name" value={form.name} onChange={handleChange}
            className={errors.name ? "input-error" : ""} placeholder="Enter product name" />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-field">
          <label>Product Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="">Select product type</option>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.type && <p className="error-text">{errors.type}</p>}
        </div>

        <div className="form-field">
          <label>Quantity Stock</label>
          <input name="quantityStock" type="number" value={form.quantityStock}
            onChange={handleChange} placeholder="Total number of stock available" />
        </div>

        <div className="form-field">
          <label>MRP</label>
          <input name="mrp" type="number" value={form.mrp}
            onChange={handleChange} placeholder="Enter MRP" />
        </div>

        <div className="form-field">
          <label>Selling Price</label>
          <input name="sellingPrice" type="number" value={form.sellingPrice}
            onChange={handleChange} placeholder="Enter selling price" />
        </div>

        <div className="form-field">
          <label>Brand Name</label>
          <input name="brandName" value={form.brandName}
            onChange={handleChange} placeholder="Enter brand name" />
        </div>

        <div className="form-field">
          <label>Product Images</label>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} />
          {previews.length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {previews.map((src, i) => (
                <img key={i} src={src} alt=""
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }} />
              ))}
            </div>
          )}
        </div>

        <div className="form-field">
          <label>Exchange or return eligibility</label>
          <select name="exchangeEligibility" value={form.exchangeEligibility} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="modal-footer">
          <button className="btn-create" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : mode === "edit" ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;