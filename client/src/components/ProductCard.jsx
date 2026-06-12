const ProductCard = ({ product, onPublish, onEdit, onDelete }) => {
  const img = product.images?.[0]
    ? product.images[0]
    : "https://placehold.co/300x175?text=No+Image";

  return (
    <div className="card">
      <div className="card-img">
        <img src={img} alt={product.name} />
      </div>
      <div className="card-name">{product.name}</div>
      <div className="card-row"><span>Product type -</span><b>{product.type}</b></div>
      <div className="card-row"><span>Quantity Stock -</span><b>{product.quantityStock}</b></div>
      <div className="card-row"><span>MRP -</span><b>₹ {product.mrp}</b></div>
      <div className="card-row"><span>Selling Price -</span><b>₹ {product.sellingPrice}</b></div>
      <div className="card-row"><span>Brand Name -</span><b>{product.brandName}</b></div>
      <div className="card-row"><span>Total Number of images -</span><b>{product.images?.length || 0}</b></div>
      <div className="card-row"><span>Exchange Eligibility -</span><b>{product.exchangeEligibility?.toUpperCase()}</b></div>
      <div className="card-actions">
        <button
          className={product.isPublished ? "btn-unpublish" : "btn-publish"}
          onClick={() => onPublish(product)}
        >
          {product.isPublished ? "Unpublish" : "Publish"}
        </button>
        <button className="btn-edit" onClick={() => onEdit(product)}>Edit</button>
        <button className="btn-trash" onClick={() => onDelete(product)}>🗑</button>
      </div>
    </div>
  );
};

export default ProductCard;