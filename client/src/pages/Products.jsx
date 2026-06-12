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