const DeleteModal = ({ product, onClose, onConfirm, loading }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Delete Product</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <p>
          Are you sure you really want to delete this Product{" "}
          <b style={{ color: "#1a1a3d" }}>" {product.name}"</b> ?
        </p>
        <div className="modal-footer">
          <button className="btn-delete" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
