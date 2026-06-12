import { useState, useEffect, useRef } from "react";

const SERVER = import.meta.env.VITE_SERVER_URL;
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
  const [files, setFiles] = useState([]);
  const [existing, setExisting] = useState([]);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();

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
      setExisting(product.images || []);
    }
  }, [mode, product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFiles = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const removeFile = (i) => setFiles(files.filter((_, idx) => idx !== i));
  const removeExisting = (i) => setExisting(existing.filter((_, idx) => idx !== i));

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Please enter product name";
    if (!form.type) err.type = "Please select product type";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const fd = new FormData();
    Object.keys(form).forEach((k) => fd.append(k, form[k]));
    files.forEach((f) => fd.append("images", f));
    onSubmit(fd);
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
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
            placeholder="Enter product name"
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-field">
          <label>Product Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="">Select product type</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.type && <p className="error-text">{errors.type}</p>}
        </div>

        <div className="form-field">
          <label>Quantity Stock</label>
          <input
            name="quantityStock"
            type="number"
            value={form.quantityStock}
            onChange={handleChange}
            placeholder="Total numbers of Stock available"
          />
        </div>

        <div className="form-field">
          <label>MRP</label>
          <input
            name="mrp"
            type="number"
            value={form.mrp}
            onChange={handleChange}
            placeholder="Total numbers of Stock available"
          />
        </div>

        <div className="form-field">
          <label>Selling Price</label>
          <input
            name="sellingPrice"
            type="number"
            value={form.sellingPrice}
            onChange={handleChange}
            placeholder="Total numbers of Stock available"
          />
        </div>

        <div className="form-field">
          <label>Brand Name</label>
          <input
            name="brandName"
            value={form.brandName}
            onChange={handleChange}
            placeholder="Total numbers of Stock available"
          />
        </div>

        <div className="form-field">
          <div className="upload-head">
            <span>Upload Product Images</span>
            <b onClick={() => fileRef.current.click()}>Add More Photos</b>
          </div>
          <input
            type="file"
            ref={fileRef}
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFiles}
          />
          {files.length === 0 && existing.length === 0 ? (
            <div className="upload-box" onClick={() => fileRef.current.click()}>
              Enter Description
              <br />
              <b style={{ color: "#1a1a3d" }}>Browse</b>
            </div>
          ) : (
            <div className="preview-row">
              {existing.map((img, i) => (
                <div className="preview-item" key={`e${i}`}>
                  <img src={`${SERVER}/uploads/${img}`} alt="" />
                  <button className="preview-remove" onClick={() => removeExisting(i)}>×</button>
                </div>
              ))}
              {files.map((f, i) => (
                <div className="preview-item" key={`f${i}`}>
                  <img src={URL.createObjectURL(f)} alt="" />
                  <button className="preview-remove" onClick={() => removeFile(i)}>×</button>
                </div>
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
